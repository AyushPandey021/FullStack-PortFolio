# 🚀 RAG (Retrieval-Augmented Generation) AI Assistant Setup

## What's Implemented

A complete **RAG system** that powers your AI assistant with:

- ✅ **Retrieval-Augmented Generation (RAG)** - Answers based on your knowledge base
- ✅ **Mistral AI Integration** - Uses Mistral's powerful language models
- ✅ **Socket.io Real-time Communication** - Live chat responses
- ✅ **Knowledge Base Processing** - Automatically loads and chunks your markdown knowledge base
- ✅ **Semantic Search** - Finds relevant information from your knowledge base
- ✅ **Beautiful Chat UI** - Integrated in the FloatingAssistant component

---

## 🔑 Getting Your Mistral API Key

### Step 1: Sign Up / Login

Visit [console.mistral.ai](https://console.mistral.ai/) and create an account or log in

### Step 2: Create API Key

- Go to **API Keys** section
- Click **Create new key**
- Copy the key

### Step 3: Add to .env

Create/edit `.env` file in the `server` folder:

```env
MISTRAL_API_KEY=your_copied_key_here
PORT=3000
```

---

## 📦 Installation & Setup

### 1. Backend Server Setup (One-time)

```bash
# Navigate to server directory
cd server

# Dependencies are already installed from npm install
# If not, run:
npm install
```

### 2. Configuration

**Important:** You MUST have a valid Mistral API key for this to work.

1. Get your API key from [https://console.mistral.ai/](https://console.mistral.ai/)
2. Copy `.env.example` to `.env`:

```bash
# On Windows:
copy .env.example .env

# On Mac/Linux:
cp .env.example .env
```

3. Edit `.env` and paste your API key:

```env
MISTRAL_API_KEY=your_actual_key_here
```

**⚠️ Note:** The API key must be valid and at least 30 characters long. If you see "Invalid API key" or authentication errors, your key is either:
- Not set in the .env file
- Incorrect/copied wrong
- Expired or revoked

**Verify your key works by testing it directly:**
```bash
curl -X POST "https://api.mistral.ai/v0/chat/completions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"mistral-small-latest","messages":[{"role":"user","content":"Hello"}]}'
```

### 3. Start the Backend Server

**Terminal 1 - Backend Server:**

```bash
cd server
npm start
```

You should see:

```
🎉 Server running on http://localhost:3000
✅ Knowledge Base: Ready
💡 Ready to handle chat requests with RAG!
```

**Terminal 2 - Frontend Development:**

```bash
npm run dev
```

---

## 🧠 How RAG Works

### Knowledge Base Processing

1. Your `ayush-pandey-knowledge-base.md` file is loaded
2. Text is split into meaningful chunks (800 characters with 200 char overlap)
3. Chunks are indexed for fast retrieval

### When User Asks a Question

1. **User sends message** → `"Tell me about your projects"`
2. **Search** → Finds relevant chunks from knowledge base
3. **Retrieve Context** → Top 3 most relevant chunks are selected
4. **Generate Response** → Mistral AI creates an answer using:
   - The retrieved context
   - System prompt with guidelines
   - User's question
5. **Send Back** → Response streams to chat in real-time

### Example Flow

```
User: "What's Ayush's main focus?"
    ↓
Search knowledge base for: "focus", "specialization", "work"
    ↓
Find chunks about: professional philosophy, tech stack, mission
    ↓
Mistral AI generates contextual answer
    ↓
"Ayush focuses on full-stack development with emphasis on..."
```

---

## ✨ Features

### Real-time Chat

- Messages appear instantly
- Connection status indicator
- Typing indicators
- Auto-scroll to latest message

### Smart Context Retrieval

- Keyword-based semantic search
- Multi-term matching
- Chunk ranking by relevance
- Top 3 relevant chunks per question

### Safe Fallbacks

- Handles API errors gracefully
- Provides helpful error messages
- Works even with incomplete knowledge base

### Responsive Design

- Works on mobile and desktop
- Touch-friendly interface
- Dark mode support
- Accessible UI

---

## 🛠️ Technical Stack

### Frontend

- React + Socket.io Client
- Framer Motion for animations
- Tailwind CSS for styling

### Backend

- Node.js + Express
- Socket.io for real-time communication
- Mistral AI API for LLM
- File system for knowledge base loading

### Models Used

- **Mistral Small Latest** - Fast, intelligent responses
- Good balance of speed and quality

---

## 📋 Customization

### Change Model

Edit `server/rag-server.js`:

```javascript
model: "mistral-small-latest"; // Can use other Mistral models
```

Available models:

- `mistral-small-latest` - Fast & efficient (default)
- `mistral-medium-latest` - Better quality
- `mistral-large-latest` - Most capable

### Adjust RAG Settings

**Chunk Size** (how big each knowledge piece is):

```javascript
knowledgeChunks = splitIntoChunks(knowledgeContent, 800, 200);
//                                               ↑    ↑
//                                          size  overlap
```

**Retrieved Chunks** (how many sources for context):

```javascript
const relevantChunks = findRelevantChunks(userMessage, 3);
//                                                      ↑
//                                              number of chunks
```

**Response Length**:

```javascript
maxTokens: 512; // 1 token ≈ 4 characters
```

**Temperature** (creativity):

```javascript
temperature: 0.7; // 0 = factual, 1 = creative
```

---

## 🧹 Updating Your Knowledge Base

### Edit Your Knowledge Base

Edit: `src/Assets/ayush-pandey-knowledge-base.md`

Replace `[ TO PERSONALIZE ]` sections with your actual information:

```markdown
## Who is Ayush Pandey?

[ TO PERSONALIZE ] - Add your background here
```

Becomes:

```markdown
## Who is Ayush Pandey?

I'm a full-stack developer with 5 years of experience in React, Node.js, and AI/ML.
I specialize in building scalable systems and user-centric interfaces.
```

### Server Automatically Reloads

- Restart the server: `npm start`
- Knowledge base is reprocessed automatically
- New information available in next chat

---

## 🚨 Troubleshooting

### "Connection refused" Error

**Problem:** Frontend can't connect to backend
**Solution:**

```bash
cd server
npm start
# Make sure you see: "🎉 Server running on http://localhost:3000"
```

### "API Key Error" or "401 Unauthorized" or "Invalid API key"

**Problem:** Mistral API key is invalid, missing, or incorrect
**Solution:**

1. **Verify the .env file exists** in the `server` folder
2. **Check the key format** - Mistral API keys are typically 40+ characters long (e.g., `AbCdEfGh...`). The key `YwICzSmiGg9csPcu7aOnTHfazLH4FKAo` is INVALID.
3. **Get a valid key:**
   - Go to [https://console.mistral.ai/](https://console.mistral.ai/)
   - Log in or create an account
   - Navigate to API Keys section
   - Create a new key and copy it
4. **Paste the key correctly** in `.env`:
   ```env
   MISTRAL_API_KEY=your_real_key_here
   ```
5. **Restart the server:**
   ```bash
   cd server
   npm start
   ```
6. **Verify it's loaded:** You should see `✅ Mistral AI client ready to use` in the server logs

**If you still get errors:**
- Check for typos in the .env file
- Ensure there are no quotes around the key
- Try creating a new API key on Mistral's console
- Check your Mistral account billing status

### No Responses from AI

**Problem:** AI is generating responses but not appearing in chat
**Solution:**

1. Check browser console (F12) for errors
2. Check server terminal for error logs
3. Verify API key is valid
4. Try a simple question: "Who is Ayush?"

### Knowledge Base Not Loaded

**Problem:** Server says "Knowledge Base: Not initialized"
**Solution:**

The server now automatically looks for the knowledge base file in multiple locations:
1. `server/ayush-pandey-knowledge-base.md` (recommended)
2. `../ayush-pandey-knowledge-base.md` (project root)
3. `../src/Assets/ayush-pandey-knowledge-base.md`

**To fix:**
1. Ensure one of these files exists with valid content
2. The file should be a markdown (.md) file with information about Ayush
3. The file should not be empty (should be at least a few KB in size)
4. Restart the server

**Note:** Your project has knowledge base files in:
- `ayush-pandey-knowledge-base.md` (root directory)
- `server/ayush-pandey-knowledge-base.md` (server directory - this is the one being used)

Both files are valid and the server will find them automatically.

### Port Already in Use

**Problem:** "Address already in use" error
**Solution:**

```bash
# Change port in server/.env
PORT=3001
```

---

## 📊 Monitoring

### Health Check

```bash
# Terminal
curl http://localhost:3000/health

# Response
{
  "status": "ok",
  "ragReady": true,
  "knowledgeChunksLoaded": 45,
  "connectedUsers": 2
}
```

### RAG Status

```bash
curl http://localhost:3000/api/rag-status

# Response
{
  "initialized": true,
  "chunksLoaded": 45,
  "apiKeyConfigured": true,
  "mistralModel": "mistral-small-latest"
}
```

---

## 💡 Next Steps

1. **Add Your Information** - Fill in the knowledge base file
2. **Customize System Prompt** - Edit the prompt in `rag-server.js`
3. **Test Questions** - Ask about different topics
4. **Deploy** - Move to production when ready
5. **Monitor Usage** - Track API costs at console.mistral.ai

---

## 🔗 Resources

- [Mistral AI Docs](https://docs.mistral.ai/)
- [Socket.io Documentation](https://socket.io/docs/)
- [LangChain Docs](https://js.langchain.com/)

---

## 📝 Cost Estimation

Mistral API pricing is very affordable:

- Mistral Small: ~$0.14 per 1M input tokens
- ~2-3 cents per 100 typical conversations

Monitor usage at [console.mistral.ai](https://console.mistral.ai/) → Usage
