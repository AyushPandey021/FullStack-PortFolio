import io from 'socket.io-client'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

let socket = null

export const initializeSocket = (serverUrl = BACKEND_URL) => {
    if (!socket) {
        socket = io(serverUrl, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5,
            transports: ['websocket', 'polling'],
            upgrade: true,
            rejectUnauthorized: false,
        })

        // Log connection status
        socket.on('connect', () => {
            console.log('✅ Socket connected')
        })

        socket.on('disconnect', () => {
            console.log('❌ Socket disconnected')
        })

        socket.on('connect_error', (error) => {
            console.error('❌ Socket connection error:', error)
        })
    }
    return socket
}

export const getSocket = () => {
    if (!socket) {
        return initializeSocket()
    }
    return socket
}

export const closeSocket = () => {
    if (socket) {
        socket.disconnect()
        socket = null
    }
}

export const sendMessage = (message) => {
    const socketInstance = getSocket()
    socketInstance.emit('chat:message', {
        text: message,
        timestamp: new Date().toISOString(),
    })
}

export const onMessageReceived = (callback) => {
    const socketInstance = getSocket()
    socketInstance.on('chat:response', callback)
}

export const onError = (callback) => {
    const socketInstance = getSocket()
    socketInstance.on('chat:error', callback)
}

export const onConnectError = (callback) => {
    const socketInstance = getSocket()
    socketInstance.on('connect_error', callback)
}

export const onConnect = (callback) => {
    const socketInstance = getSocket()
    socketInstance.on('connect', callback)
}

export const onDisconnect = (callback) => {
    const socketInstance = getSocket()
    socketInstance.on('disconnect', callback)
}
