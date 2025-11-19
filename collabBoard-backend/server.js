// server.js (Finalized Backend Bootstrap with Socket.io)
const express = require('express');
const http = require('http'); // Import HTTP module
const { Server } = require('socket.io'); // Import Socket.io Server
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/dbConnect');
const { errorHandler } = require('./src/middleware/errorMiddleware');
const authRoutes = require('./src/routes/authRoutes');
const boardRoutes = require('./src/routes/boardRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const inviteRoutes = require("./src/routes/inviteRoutes");

// Load environment variables
dotenv.config();

// Connect Database
connectDB();

const app = express();
const httpServer = http.createServer(app); // 1. Create HTTP server from Express app

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);
app.use("/api/invites", inviteRoutes);

// Global Error Handler
app.use(errorHandler);


// --- Socket.io Setup ---
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173", // CHANGE THIS TO YOUR FRONTEND URL (e.g., Vercel URL)
        methods: ["GET", "POST"]
    }
});

// Socket.io Connection Logic
io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // Handler for a user joining a specific board/room
    socket.on('joinBoard', (boardId) => {
        socket.join(boardId);
        console.log(`User ${socket.id} joined room: ${boardId}`);
    });

    // Handler for task updates (emitted from the client after a successful API call)
    socket.on('taskUpdate', (boardId, taskData) => {
        // Broadcast the update to all other users in that board room
        socket.to(boardId).emit('taskUpdated', taskData);
    });
    
    // Handler for board updates (e.g., new collaborator added, task deleted)
    socket.on('boardUpdate', (boardId, message) => {
        // Broadcast a generic "re-fetch" signal
        socket.to(boardId).emit('boardRefetch', message);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});
// --- End Socket.io Setup ---


const PORT = process.env.PORT || 5000;

// 2. Listen on the HTTP server, not the Express app
httpServer.listen(
    PORT,
    () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);