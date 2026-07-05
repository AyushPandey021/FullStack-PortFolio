// server.js
require('dotenv').config()

const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const https = require('https')

// ============================================
// CONFIGURATION
// ============================================
const app = express()
const server = http.createServer(app)

const allowedOrigins = [
    'http://localhost:5173',
    'http://192.168.10.35:5173',
    'http://localhost:3000',
]

const io = socketIo(server, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST'],
        credentials: true,
        allowEIO3: true,
    },
    transports: ['websocket', 'polling'],
})

app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json())

// ============================================
// MISTRAL AI - Using RAW REST API only (no SDK)
// ============================================
const apiKey = process.env.MISTRAL_API_KEY
// Use the versioned "latest" alias — an unversioned model id can be
// silently deprecated or behave inconsistently.
const MODEL_NAME = process.env.MISTRAL_MODEL || 'mistral-small-latest'

console.log('🔍 Checking API Key...')
if (apiKey) {
    console.log(`API Key length: ${apiKey.length} characters`)
    if (apiKey.length >= 30) {
        console.log('✅ Mistral API key ready')
    } else {
        console.warn('⚠️  API key too short - should be 40+ characters')
    }
} else {
    console.error('❌ MISTRAL_API_KEY not set in .env')
}

// ============================================
// KNOWLEDGE BASE
// ============================================
let knowledgeBase = { fullContent: '', chunks: [] }
let knowledgeChunks = []

async function initializeKnowledgeBase() {
    try {
        console.log('🚀 Initializing Knowledge Base...')

        const possiblePaths = [
            path.join(__dirname, 'ayush-pandey-knowledge-base.md'),
            path.join(__dirname, '../ayush-pandey-knowledge-base.md'),
        ]

        let kbPath = null
        for (const p of possiblePaths) {
            if (fs.existsSync(p)) {
                kbPath = p
                break
            }
        }

        if (!kbPath) {
            console.error('❌ Knowledge base file not found')
            return false
        }

        const content = fs.readFileSync(kbPath, 'utf-8')
        console.log(`✓ Loaded ${content.length} characters`)

        knowledgeChunks = splitIntoChunks(content, 800, 200)
        knowledgeBase = { fullContent: content, chunks: knowledgeChunks }
        console.log(`✓ Split into ${knowledgeChunks.length} chunks`)
        console.log('✅ Knowledge Base ready!')
        return true
    } catch (error) {
        console.error('❌ Error loading knowledge base:', error.message)
        return false
    }
}

// ============================================
// TEXT PROCESSING
// ============================================
function splitIntoChunks(text, chunkSize = 800, overlap = 200) {
    if (!text || typeof text !== 'string') return []
    if (overlap >= chunkSize) throw new Error('Overlap must be < chunk size')

    const chunks = []
    let start = 0

    while (start < text.length) {
        let end = Math.min(start + chunkSize, text.length)
        if (end < text.length) {
            const breaks = [
                text.lastIndexOf('. ', end),
                text.lastIndexOf('\n\n', end),
                text.lastIndexOf('\n', end),
            ]
            const lastBreak = Math.max(...breaks)
            if (lastBreak > start + 100) end = lastBreak + 1
        }

        const chunk = text.substring(start, end).trim()
        if (chunk.length > 50) chunks.push(chunk)

        if (end >= text.length) break
        const nextStart = Math.max(end - overlap, start + 1)
        if (nextStart <= start) break
        start = nextStart
    }
    return chunks
}

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// FIX: word-boundary matching so short terms ("AI", "PM") don't
// falsely match inside unrelated words, which was polluting retrieval
// and starving the model of the right context.
function findRelevantChunks(query, topK = 4) {
    if (!query || typeof query !== 'string') return []
    if (!knowledgeChunks.length) return []

    const terms = query.toLowerCase().split(/\s+/).map(t => t.trim()).filter(t => t.length > 2)
    if (!terms.length) return []

    const scored = knowledgeChunks.map(chunk => {
        const chunkLower = chunk.toLowerCase()
        let score = 0
        terms.forEach(term => {
            const pattern = new RegExp(`\\b${escapeRegex(term)}\\b`, 'g')
            const matches = chunkLower.match(pattern) || []
            score += matches.length * 2
        })
        return { chunk, score }
    })

    return scored
        .filter(i => i.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, topK)
        .map(i => i.chunk)
}

// Strip any markdown the model outputs despite instructions, as a safety
// net — headers/bullets read poorly in a small chat bubble.
function cleanResponseText(text) {
    return text
        .replace(/^#{1,6}\s+/gm, '')      // strip markdown headers
        .replace(/^[-*]\s+/gm, '')        // strip bullet markers
        .replace(/\n{3,}/g, '\n\n')       // collapse excess blank lines
        .trim()
}

// ============================================
// RAG RESPONSE GENERATION - Uses RAW HTTPS API
// ============================================
async function generateRAGResponse(userMessage) {
    try {
        if (!apiKey || apiKey.trim() === '') {
            return "I'm unable to connect to Mistral AI. Please set MISTRAL_API_KEY in your .env file. Get a key from https://console.mistral.ai/"
        }

        if (apiKey.length < 20) {
            return "Invalid API key. Mistral keys are 30+ characters. Please check your .env file."
        }

        const relevantChunks = findRelevantChunks(userMessage, 4)
        const hasContext = relevantChunks.length > 0
        const contextText = hasContext
            ? relevantChunks.join('\n\n---\n\n')
            : '(No matching information was found in the knowledge base for this question.)'

        // FIX: explicit anti-hallucination instruction, no-markdown instruction,
        // and a hard length cap — this is what was producing the confident,
        // fabricated-sounding answer.
        const systemPrompt = `
You are the AI assistant on Ayush Pandey's personal portfolio site. You speak ABOUT Ayush in the third person, to a visitor — never pretend to be Ayush yourself.

Ground rules:
1. Only state facts that appear explicitly in the CONTEXT below. Do not invent or infer specific details (job titles, company names, locations, dates, employers, metrics) that are not explicitly written in the context, even if they sound plausible.
2. If the context does not contain the specific fact the visitor asked about, say so plainly — for example: "I don't have that specific detail in my knowledge base yet, but I can tell you about..." and pivot to something the context does cover. Never guess to fill the gap.
3. Do not use markdown formatting — no **bold**, no headers, no bullet lists. Write in plain, natural sentences only.
4. Keep the answer to 1-3 short sentences. Be warm, professional, and direct — like a knowledgeable colleague answering quickly, not a resume reading itself aloud.

CONTEXT:
${contextText}
        `.trim()

        const response = await new Promise((resolve, reject) => {
            const postData = JSON.stringify({
                model: MODEL_NAME,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userMessage }
                ],
                temperature: 0.3, // lower temperature = less improvisation, more grounded
                max_tokens: 220,
            })

            const options = {
                hostname: 'api.mistral.ai',
                port: 443,
                path: '/v1/chat/completions',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData),
                    'Authorization': `Bearer ${apiKey}`
                }
            }

            const req = https.request(options, res => {
                let data = ''
                res.on('data', chunk => { data += chunk })
                res.on('end', () => {
                    if (res.statusCode !== 200) {
                        return reject(new Error(data || 'API request failed'))
                    }
                    try {
                        const parsed = JSON.parse(data)
                        if (parsed.choices?.[0]?.message?.content) {
                            resolve(parsed.choices[0].message.content)
                        } else {
                            reject(new Error('Invalid API response format'))
                        }
                    } catch (e) {
                        reject(e)
                    }
                })
            })

            req.on('error', reject)
            req.write(postData)
            req.end()
        })

        return cleanResponseText(response)
    } catch (error) {
        console.error('API Error:', error.message)
        const msg = error?.message?.toLowerCase() || ''

        if (msg.includes('401') || msg.includes('unauthorized') || msg.includes('authentication') || msg.includes('invalid api key')) {
            return "Authentication failed. Please check your MISTRAL_API_KEY is valid (40+ characters from console.mistral.ai)."
        }
        if (msg.includes('404') || msg.includes('no route')) {
            return `API endpoint not found. Please check your Mistral API key and ensure you're using a valid model (currently set to "${MODEL_NAME}").`
        }
        if (msg.includes('429') || msg.includes('rate limit')) {
            return "Rate limited. Please wait and try again."
        }
        if (msg.includes('network') || msg.includes('econn')) {
            return "Network error. Please check your internet connection."
        }
        if (!knowledgeChunks.length) {
            return "Knowledge base not loaded. Please restart the server."
        }

        console.error('Full error:', error)
        return 'Error processing your question. Please check server logs and verify your API key is valid.'
    }
}

// ============================================
// SOCKET.IO
// ============================================
const connectedUsers = new Map()

io.on('connection', socket => {
    console.log('✓ Client connected:', socket.id)
    connectedUsers.set(socket.id, { id: socket.id, connectedAt: new Date() })

    socket.emit('connection:status', {
        status: 'connected',
        message: 'Connected to Ayush AI Assistant',
        ragReady: knowledgeChunks.length > 0
    })

    socket.on('chat:message', async data => {
        const text = typeof data?.text === 'string' ? data.text.trim() : ''
        if (!text) {
            socket.emit('chat:error', { error: 'Please enter a message.' })
            return
        }

        console.log(`📨 Message from ${socket.id}:`, text)

        try {
            const response = await generateRAGResponse(text)
            socket.emit('chat:response', {
                text: response,
                timestamp: new Date().toISOString(),
                sources: "Ayush's Knowledge Base + Mistral AI"
            })
            console.log(`✓ Response sent`)
        } catch (error) {
            console.error('Socket error:', error)
            socket.emit('chat:error', { error: 'Error generating response.' })
        }
    })

    socket.on('disconnect', () => {
        console.log('✗ Client disconnected:', socket.id)
        connectedUsers.delete(socket.id)
    })
})

// ============================================
// API ENDPOINTS
// ============================================
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        ragReady: knowledgeChunks.length > 0,
        chunks: knowledgeChunks.length,
        users: connectedUsers.size
    })
})

app.get('/api/rag-status', (req, res) => {
    res.json({
        initialized: knowledgeChunks.length > 0,
        chunks: knowledgeChunks.length,
        apiKeyValid: apiKey && apiKey.length >= 30,
        model: MODEL_NAME,
    })
})

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 3000

async function startServer() {
    const kbReady = await initializeKnowledgeBase()

    if (!apiKey) {
        console.warn('⚠️  MISTRAL_API_KEY not set - AI will not work')
    } else if (apiKey.length < 30) {
        console.warn('⚠️  API key too short - get valid key from console.mistral.ai')
    }

    server.listen(PORT, () => {
        console.log(`\n🎉 Server running on http://localhost:${PORT}`)
        console.log(`📊 Health: http://localhost:${PORT}/health`)
        console.log(kbReady ? '✅ Knowledge Base: Ready' : '⚠️  Knowledge Base: Failed')
        console.log(apiKey && apiKey.length >= 30 ? `✅ Mistral API: Configured (${MODEL_NAME})` : '⚠️  Mistral API: Not configured')
        console.log('\n💡 Ready!\n')
    })
}

startServer()