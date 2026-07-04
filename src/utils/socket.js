import io from 'socket.io-client'

let socket = null

export const initializeSocket = (serverUrl = 'http://localhost:3000') => {
    if (!socket) {
        socket = io(serverUrl, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5,
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

export const onConnect = (callback) => {
    const socketInstance = getSocket()
    socketInstance.on('connect', callback)
}

export const onDisconnect = (callback) => {
    const socketInstance = getSocket()
    socketInstance.on('disconnect', callback)
}
