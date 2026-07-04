# Socket.io Chat Integration Setup

## What's Been Done

✅ **Frontend Setup Complete:**

- Installed `socket.io-client` dependency
- Created `FloatingAssistant` with real-time chat interface
- Created `ChatMessage` component for message display
- Created `socket.js` utility for socket connections

## Frontend Features

The updated **FloatingAssistant** now includes:

- Real-time message display
- User input field with send button
- Connection status indicator (🟢 Connected / 🔴 Connecting)
- Auto-scrolling to latest messages
- Loading animation while waiting for response
- Responsive design that works on mobile and desktop
- Dark mode support

## Backend Setup Required

You need to create a Node.js/Express server with Socket.io to handle:

### 1. Create a new `server` folder in your project:

```bash
mkdir server
cd server
npm init -y
```

### 2. Install dependencies:

```bash
npm install express socket.io cors dotenv
```

### 3. Create `server.js` using the `BACKEND_EXAMPLE.js` as a template

### 4. Environment Variables (`.env` in server folder):

```
PORT=3000
```

### 5. Update your socket connection URL in `src/utils/socket.js`:

```javascript
export const initializeSocket = (serverUrl = 'http://localhost:3000') => {
```

### 6. Start your server:

```bash
node server.js
```

## Socket Events

### Client → Server

- **chat:message** - User sends a message
  ```javascript
  { text: string, timestamp: ISO-string }
  ```

### Server → Client

- **chat:response** - Server sends response
  ```javascript
  { text: string, timestamp: ISO-string }
  ```

## AI Integration Options

Replace the `generateResponse()` function in your server with:

- **OpenAI API** - GPT-4, GPT-3.5-turbo
- **Claude API** - Anthropic's Claude
- **Hugging Face** - Open-source models
- **Custom Knowledge Base** - Search and retrieve
- **Database Queries** - Store and retrieve user data

## Example: Using OpenAI

```javascript
const { Configuration, OpenAIApi } = require("openai");

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  }),
);

async function generateResponse(userMessage) {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are Ayush's AI Assistant. Answer questions about Ayush's portfolio, projects, and skills.",
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  return response.data.choices[0].message.content;
}
```

## Production Deployment

For production:

1. Use a proper backend hosting (Vercel, Heroku, AWS, etc.)
2. Update CORS origin URLs
3. Add authentication if needed
4. Implement rate limiting
5. Add error handling and logging
