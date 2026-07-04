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

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
)

app.use(express.json())

// ============================================
// MISTRAL AI SETUP
// ============================================
const apiKey = process.env.MISTRAL_API_KEY

console.log('🔍 Checking API Key configuration...')
console.log(`MISTRAL_API_KEY present: ${apiKey ? '✅ Yes' : '❌ No'}`)
console.log(`API Key length: ${apiKey ? apiKey.length : 'N/A'} characters`)

if (!apiKey) {
    console.error('❌ MISTRAL_API_KEY environment variable not set')
    console.log('Set it in your .env file like: MISTRAL_API_KEY=your_key_here')
} else {
    console.log('✅ Mistral AI client ready to use')
}

// ============================================
// KNOWLEDGE BASE SETUP
// ============================================
let knowledgeBase = {
    fullContent: '',
    chunks: [],
}

let knowledgeChunks = []

async function initializeKnowledgeBase() {
    try {
        console.log('🚀 Initializing Knowledge Base...')

        // Try multiple possible paths for the knowledge base
        const possiblePaths = [
            path.join(__dirname, 'ayush-pandey-knowledge-base.md'),
            path.join(__dirname, '../ayush-pandey-knowledge-base.md'),
            path.join(__dirname, '../src/Assets/ayush-pandey-knowledge-base.md'),
        ]

        let kbPath = null
        for (const p of possiblePaths) {
            if (fs.existsSync(p)) {
                kbPath = p
                break
            }
        }

        if (!kbPath) {
            console.error(`❌ Knowledge base not found in any expected location`)
            console.error(`Tried paths: ${possiblePaths.join(', ')}`)
            return false
        }

        console.log(`✓ Found knowledge base at: ${kbPath}`)

        const knowledgeContent = fs.readFileSync(kbPath, 'utf-8')
        console.log(`✓ Loaded knowledge base (${knowledgeContent.length} characters)`)

        knowledgeChunks = splitIntoChunks(knowledgeContent, 800, 200)
        console.log(`✓ Split into ${knowledgeChunks.length} chunks`)

        knowledgeBase = {
            fullContent: knowledgeContent,
            chunks: knowledgeChunks,
        }

        console.log('✅ Knowledge Base initialized successfully!')
        return true
    } catch (error) {
        console.error('❌ Error initializing knowledge base:', error.message)
        return false
    }
}

// ============================================
// TEXT SPLITTER
// ============================================
function splitIntoChunks(text, chunkSize = 800, overlap = 200) {
    if (!text || typeof text !== 'string') {
        return []
    }

    if (overlap >= chunkSize) {
        throw new Error('Chunk overlap must be smaller than chunk size.')
    }

    const chunks = []
    let start = 0

    while (start < text.length) {
        let end = Math.min(start + chunkSize, text.length)

        if (end < text.length) {
            const breakPoints = [
                text.lastIndexOf('. ', end),
                text.lastIndexOf('\n\n', end),
                text.lastIndexOf('\n', end),
            ]

            const lastBreak = Math.max(...breakPoints)

            if (lastBreak > start + 100) {
                end = lastBreak + 1
            }
        }

        const chunk = text.substring(start, end).trim()

        if (chunk.length > 50) {
            chunks.push(chunk)
        }

        if (end >= text.length) {
            break
        }

        const nextStart = Math.max(end - overlap, start + 1)

        if (nextStart <= start) {
            break
        }

        start = nextStart
    }

    return chunks
}

// ============================================
// SIMPLE SEMANTIC SEARCH
// ============================================
function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function findRelevantChunks(query, topK = 3) {
    if (!query || typeof query !== 'string') {
        return []
    }

    if (!knowledgeChunks.length) {
        return []
    }

    const queryTerms = query
        .toLowerCase()
        .split(/\s+/)
        .map((term) => term.trim())
        .filter((term) => term.length > 2)

    if (!queryTerms.length) {
        return []
    }

    const scored = knowledgeChunks.map((chunk) => {
        const chunkLower = chunk.toLowerCase()
        let score = 0

        queryTerms.forEach((term) => {
            const safeTerm = escapeRegex(term)
            const matches = chunkLower.match(new RegExp(safeTerm, 'g')) || []
            score += matches.length
        })

        const foundTerms = queryTerms.filter((term) => chunkLower.includes(term))
        score += foundTerms.length * 2

        return { chunk, score }
    })

    return scored
        .sort((a, b) => b.score - a.score)
        .slice(0, topK)
        .filter((item) => item.score > 0)
        .map((item) => item.chunk)
}

// ============================================
// RESPONSE GENERATION WITH RAG
// ============================================
async function generateRAGResponse(userMessage) {
    try {
        if (!apiKey || apiKey.trim() === '') {
            return "I'm unable to connect to Mistral AI. The API key is not configured. Please add MISTRAL_API_KEY to your .env file with a valid key from https://console.mistral.ai/"
        }
        
        // Check if API key looks valid (should be at least 30 characters)
        if (apiKey.length < 30) {
            return "I'm unable to authenticate with Mistral AI. The API key appears to be invalid or incomplete. Please verify your MISTRAL_API_KEY in the .env file."
        }

        const relevantChunks = findRelevantChunks(userMessage, 3)

        const contextText =
            relevantChunks.length > 0
                ? `Based on Ayush's knowledge base:\n\n${relevantChunks.join('\n\n---\n\n')}`
                : "No relevant information was found in Ayush's knowledge base. Answer only with general portfolio guidance and be honest about missing details."

        const systemPrompt = `
You are Ayush Pandey's AI Assistant, helping visitors learn about Ayush's background, skills, projects, and experience.

Context:
${contextText}

Guidelines:
1. Be warm, professional, and genuinely helpful.
2. Use the knowledge base context when relevant.
3. If information is missing or marked "[ TO PERSONALIZE ]", say so honestly.
4. Keep responses concise but informative, usually 2-4 sentences.
5. Reference portfolio sections when useful.
6. Do not invent details about Ayush.
7. Ask a relevant follow-up question only when it improves the conversation.

Portfolio sections:
- Projects & Portfolio
- Skills & Tech Stack
- About
- Contact

Respond naturally and conversationally.
`.trim()

        // Use Mistral REST API directly
        const response = await new Promise((resolve, reject) => {
            const postData = JSON.stringify({
                model: 'mistral-small-latest',
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt,
                    },
                    {
                        role: 'user',
                        content: userMessage,
                    },
                ],
                temperature: 0.7,
                max_tokens: 512,
            })

            const options = {
                hostname: 'api.mistral.ai',
                port: 443,
                path: '/v0/chat/completions',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData),
                    'Authorization': `Bearer ${apiKey}`,
                },
            }

            const req = https.request(options, (res) => {
                let data = ''

                res.on('data', (chunk) => {
                    data += chunk
                })

                res.on('end', () => {
                    try {
                        const parsed = JSON.parse(data)
                        if (parsed.choices && parsed.choices[0] && parsed.choices[0].message) {
                            resolve(parsed.choices[0].message.content)
                        } else {
                            reject(new Error('Invalid response format from Mistral API'))
                        }
                    } catch (err) {
                        reject(err)
                    }
                })
            })

            req.on('error', (error) => {
                reject(error)
            })

            req.write(postData)
            req.end()
        })

        return response
    } catch (error) {
        console.error('Error generating response:', error.message)

        const message = error?.message || 'Unknown error'
        const messageLower = message.toLowerCase()

        if (messageLower.includes('authentication') || messageLower.includes('401') || messageLower.includes('invalid api key')) {
            return "I'm unable to authenticate with Mistral AI. This usually means the API key is incorrect or not set. Please check your .env file and ensure MISTRAL_API_KEY is valid."
        }

        if (messageLower.includes('429') || messageLower.includes('rate limit')) {
            return "I'm currently rate-limited by Mistral AI. Please try again in a moment."
        }

        if (messageLower.includes('network') || messageLower.includes('fetch') || messageLower.includes('econnrefused')) {
            return "I'm having trouble connecting to Mistral AI. Please check your internet connection and try again."
        }

        // If knowledge base is empty, provide a helpful message
        if (!knowledgeBase || !knowledgeBase.chunks || knowledgeBase.chunks.length === 0) {
            return "I'm ready to help but my knowledge base isn't loaded. Please ensure the knowledge base file exists and is properly formatted."
        }

        console.error('Full error:', error)
        return 'I encountered an error processing your question. Please try again, and if the issue persists, check the server logs.'
    }
}

// ============================================
// SOCKET.IO CONNECTION HANDLING
// ============================================
const connectedUsers = new Map()

io.on('connection', (socket) => {
    console.log('✓ Client connected:', socket.id)

    connectedUsers.set(socket.id, {
        id: socket.id,
        connectedAt: new Date(),
    })

    socket.emit('connection:status', {
        status: 'connected',
        message: 'Connected to Ayush AI Assistant',
        ragReady: knowledgeBase.chunks.length > 0,
    })

    socket.on('chat:message', async (data = {}) => {
        const userText = typeof data.text === 'string' ? data.text.trim() : ''

        if (!userText) {
            socket.emit('chat:error', {
                error: 'Message text is required.',
            })
            return
        }

        console.log(`📨 Message from ${socket.id}:`, userText)

        try {
            const response = await generateRAGResponse(userText)

            socket.emit('chat:response', {
                text: response,
                timestamp: new Date().toISOString(),
                sources: "Ayush's Knowledge Base + Mistral AI",
            })

            console.log(`✓ Response sent to ${socket.id}`)
        } catch (error) {
            console.error('Error handling message:', error)

            socket.emit('chat:error', {
                error: 'Failed to generate response. Please try again.',
                details: error.message,
            })
        }
    })
    
    // Handle connection errors
    socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error.message)
    })

    socket.on('disconnect', () => {
        console.log('✗ Client disconnected:', socket.id)
        connectedUsers.delete(socket.id)
    })
})

// ============================================
// REST ENDPOINTS
// ============================================
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        ragReady: knowledgeBase.chunks.length > 0,
        knowledgeChunksLoaded: knowledgeChunks.length,
        connectedUsers: connectedUsers.size,
        timestamp: new Date().toISOString(),
    })
})

app.get('/api/rag-status', (req, res) => {
    res.json({
        initialized: knowledgeBase.chunks.length > 0,
        chunksLoaded: knowledgeChunks.length,
        apiKeyConfigured: Boolean(apiKey),
        mistralModel: 'mistral-small-latest',
    })
})

// ============================================
// SERVER STARTUP
// ============================================
const PORT = process.env.PORT || 3000

async function startServer() {
    try {
        const kbInitialized = await initializeKnowledgeBase()

        if (!apiKey) {
            console.warn('⚠️  Warning: MISTRAL_API_KEY not configured. Server will start but AI responses will fail.')
        }

        server.listen(PORT, () => {
            console.log(`\n🎉 Server running on http://localhost:${PORT}`)
            console.log(`📊 Health check: http://localhost:${PORT}/health`)
            console.log(`📡 RAG Status: http://localhost:${PORT}/api/rag-status`)

            if (kbInitialized) {
                console.log('✅ Knowledge Base: Ready')
            } else {
                console.log('⚠️  Knowledge Base: Not initialized')
            }

            console.log('\n💡 Ready to handle chat requests with RAG!\n')
        })
    } catch (error) {
        console.error('❌ Failed to start server:', error.message)
        process.exit(1)
    }
}

startServer()
