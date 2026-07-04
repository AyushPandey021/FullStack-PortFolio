import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiSparkles, HiXMark, HiPaperAirplane } from "react-icons/hi2";
import {
  initializeSocket,
  getSocket,
  sendMessage,
  onMessageReceived,
  onConnect,
  onDisconnect,
} from "../utils/socket";
import ChatMessage from "./ChatMessage";

export default function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Ayush's AI Assistant. Ask me anything about Ayush, his projects, skills, or experience!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = initializeSocket();

    // Handle connection
    onConnect(() => {
      setIsConnected(true);
      console.log("Socket connected");
    });

    // Handle disconnection
    onDisconnect(() => {
      setIsConnected(false);
      console.log("Socket disconnected");
    });

    // Handle incoming messages
    onMessageReceived((data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: data.text || data,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    });

    return () => {
      // Cleanup on unmount
    };
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Send through socket
    sendMessage(inputValue);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] grid justify-items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            className="relative w-[min(380px,calc(100vw-40px))] h-[500px] rounded-lg border border-black/10 bg-white/95 shadow-premium backdrop-blur-2xl dark:border-white/10 dark:bg-gray-900/95 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/5 bg-gradient-to-r from-ember/10 to-transparent p-4 dark:border-white/5">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Ask About Ayush
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {isConnected ? "🟢 Connected" : "🔴 Connecting..."}
                </p>
              </div>
              <button
                className="grid size-8 place-items-center rounded-lg border border-black/10 bg-white/70 hover:bg-white dark:border-white/10 dark:bg-white/10 hover:dark:bg-white/20 transition-colors"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
              >
                <HiXMark />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg.text}
                  isUser={msg.isUser}
                />
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg rounded-bl-none px-3 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.1s]" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-black/5 bg-white/50 p-3 dark:border-white/5 dark:bg-gray-800/50"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 rounded-lg border border-black/10 bg-white px-3 py-2 text-sm placeholder-gray-500 focus:border-ember focus:outline-none focus:ring-1 focus:ring-ember dark:border-white/10 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="grid size-9 place-items-center rounded-lg bg-ember text-white hover:bg-orange-600 disabled:bg-gray-400 transition-colors"
                  aria-label="Send message"
                >
                  <HiPaperAirplane size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        className="relative grid size-14 place-items-center rounded-full bg-ember text-white shadow-[0_18px_44px_rgba(255,106,0,0.34)] hover:bg-orange-600 transition-colors"
        onClick={() => setOpen((current) => !current)}
        aria-label="Open Ayush Assistant"
      >
        <span className="absolute -inset-1.5 animate-pulse rounded-full border border-ember/60" />
        <HiSparkles size={24} />
      </button>
    </div>
  );
}
