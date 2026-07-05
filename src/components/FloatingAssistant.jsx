// FloatingAssistant.jsx
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiSparkles,
  HiXMark,
  HiPaperAirplane,
  HiExclamationTriangle,
} from "react-icons/hi2";
import {
  initializeSocket,
  getSocket,
  sendMessage,
  onMessageReceived,
  onConnect,
  onDisconnect,
  onError,
  onConnectError,
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
      shouldAnimate: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = initializeSocket();

    onConnect(() => {
      setIsConnected(true);
      setError(null);
    });

    onDisconnect(() => {
      setIsConnected(false);
    });

    onConnectError((err) => {
      console.error("Socket connection error:", err);
      setIsConnected(false);
      setError(
        "Unable to connect to the AI assistant server. Please ensure the backend is running.",
      );
    });

    onMessageReceived((data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: data.text || data,
          isUser: false,
          timestamp: new Date(),
          shouldAnimate: true,
        },
      ]);
      setIsLoading(false);
      setError(null);
    });

    onError((data) => {
      setIsLoading(false);
      const errorMessage =
        data.error || data.message || "An error occurred. Please try again.";
      setError(errorMessage);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: errorMessage,
          isUser: false,
          timestamp: new Date(),
          isError: true,
          shouldAnimate: false,
        },
      ]);
    });

    return () => {};
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    sendMessage(inputValue);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] grid justify-items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            className="relative flex h-[500px] w-[min(380px,calc(100vw-40px))] flex-col overflow-hidden rounded-2xl border border-purple-500/10 bg-white/95 shadow-premium ring-1 ring-purple-500/10 backdrop-blur-2xl dark:border-purple-500/20 dark:bg-[#0a0f2c]/95 dark:ring-purple-500/10"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-purple-500/10 bg-gradient-to-r from-purple-500/10 via-cyan-500/5 to-transparent p-4 dark:border-purple-500/20">
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white">
                  Ask About Ayush
                </h3>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <span
                    className={`inline-block size-1.5 rounded-full ${
                      isConnected ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                  />
                  {isConnected ? "Connected" : "Connecting..."}
                </p>
              </div>
              <button
                className="grid size-8 place-items-center rounded-lg border border-purple-500/20 bg-purple-500/5 text-purple-500 transition-all hover:scale-105 hover:bg-purple-500/10 active:scale-95 dark:text-purple-400 dark:hover:bg-purple-500/15"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
              >
                <HiXMark />
              </button>
            </div>

            {/* Error Banner */}
            {error && !isConnected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden border-b border-red-200 bg-red-50 p-3 text-xs text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
              >
                <div className="flex items-center gap-2">
                  <HiExclamationTriangle className="flex-shrink-0" size={14} />
                  <span>{error}</span>
                </div>
              </motion.div>
            )}

            {/* Messages Container */}
            <div className="flex-1 space-y-2 overflow-y-auto bg-gradient-to-b from-transparent to-white/50 p-4 dark:to-[#0a0f2c]/50">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg.text}
                  isUser={msg.isUser}
                  isError={msg.isError}
                  shouldAnimate={msg.shouldAnimate}
                />
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-start"
                >
                  <div className="rounded-lg rounded-bl-none border border-purple-500/10 bg-purple-500/5 px-3 py-2 shadow-sm dark:border-white/10 dark:bg-white/5">
                    <div className="flex gap-1">
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-purple-500"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-purple-400"
                        style={{ animationDelay: "100ms" }}
                      />
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
                        style={{ animationDelay: "200ms" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-purple-500/10 bg-white/50 p-3 backdrop-blur-sm dark:border-purple-500/20 dark:bg-white/5"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 rounded-lg border border-purple-500/15 bg-white/80 px-3 py-2 text-sm text-slate-800 placeholder-gray-500 transition-all duration-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-gray-400"
                  disabled={isLoading}
                />
                <motion.button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="grid size-9 flex-shrink-0 place-items-center rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 text-white shadow-md transition-all hover:shadow-lg hover:brightness-110 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:bg-none disabled:shadow-none"
                  aria-label="Send message"
                >
                  <HiPaperAirplane size={18} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        className="relative grid size-14 place-items-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 text-white shadow-[0_18px_44px_rgba(108,92,231,0.34)] transition-all hover:brightness-110"
        onClick={() => setOpen((current) => !current)}
        aria-label="Open Ayush Assistant"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="absolute -inset-1.5 animate-pulse rounded-full border-2 border-purple-400/50" />
        <HiSparkles size={24} />
      </motion.button>
    </div>
  );
}
