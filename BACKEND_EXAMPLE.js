// BACKEND SETUP EXAMPLE - Socket.io Server
// This is an example Node.js/Express server with Socket.io
// Install dependencies: npm install express socket.io cors dotenv

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://192.168.10.35:5173'],
        methods: ['GET', 'POST'],
    },
});

app.use(cors());
app.use(express.json());

// Store connected users
const connectedUsers = new Map();

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);
    connectedUsers.set(socket.id, { id: socket.id, connectedAt: new Date() });

    // Listen for chat messages
    socket.on('chat:message', async (data) => {
        console.log('Message received:', data);

        // Here you can:
        // 1. Process the message with AI/LLM (OpenAI, Hugging Face, etc.)
        // 2. Query a database
        // 3. Generate a response based on your logic

        // EXAMPLE: Simple response
        const response = generateResponse(data.text);

        // Send response back to client
        socket.emit('chat:response', {
            text: response,
            timestamp: new Date().toISOString(),
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        connectedUsers.delete(socket.id);
    });
});

// Example function - Replace with your AI logic
function generateResponse(userMessage) {
    // This is where you'd integrate with:
    // - GPT API, Claude API, Llama, etc.
    // - Or your custom logic

    const responses = {
        'hello': "Hi there! I'm Ayush's AI Assistant. How can I help you?",
        'projects': "Ayush has worked on several amazing projects. Check the Projects page for details!",
        'skills': "Ayush is skilled in React, Node.js, AI/ML, and more. Visit the Skills page to learn more!",
        'contact': "You can reach Ayush through the Contact page. Let's connect!",
    };

    const lowerMessage = userMessage.toLowerCase();
    for (const [key, value] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return value;
        }
    }

    return "That's interesting! You can learn more about Ayush by visiting different sections of the portfolio.";
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
