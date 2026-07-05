// ChatMessage.jsx
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { HiExclamationTriangle } from "react-icons/hi2";

// Lightweight inline-markdown renderer — handles the occasional stray
// **bold** the model produces despite being told not to, so it renders
// as real emphasis instead of literal asterisks.
function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={i}
          className="font-semibold text-purple-600 dark:text-purple-300"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ChatMessage({
  message,
  isUser,
  isError,
  shouldAnimate = false,
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (shouldAnimate && message && !isUser && !isError) {
      setDisplayedText("");
      setIsAnimating(true);

      const total = message.length;
      const targetDuration = Math.min(1600, Math.max(350, total * 16));
      const tickMs = 20;
      const charsPerTick = Math.max(
        1,
        Math.ceil(total / (targetDuration / tickMs)),
      );

      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        currentIndex += charsPerTick;
        if (currentIndex >= total) {
          setDisplayedText(message);
          clearInterval(typingInterval);
          setIsAnimating(false);
        } else {
          setDisplayedText(message.slice(0, currentIndex));
        }
      }, tickMs);

      intervalRef.current = typingInterval;
      return () => clearInterval(typingInterval);
    } else {
      setDisplayedText(message);
      setIsAnimating(false);
    }
  }, [message, isUser, isError, shouldAnimate]);

  const skipTyping = () => {
    if (!isAnimating) return;
    clearInterval(intervalRef.current);
    setDisplayedText(message);
    setIsAnimating(false);
  };

  const BlinkingCursor = () => (
    <motion.span
      className="inline-block h-4 w-[2px] bg-purple-400 opacity-70"
      animate={{ opacity: [0.7, 0.7, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
    />
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className={`mb-3 flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        onClick={skipTyping}
        className={`flex max-w-[80%] items-start gap-2 rounded-lg px-3 py-2 text-sm ${
          isAnimating ? "cursor-pointer" : ""
        } ${
          isUser
            ? "rounded-br-none bg-gradient-to-br from-purple-500 to-cyan-500 text-white shadow-md"
            : isError
              ? "rounded-bl-none bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
              : "rounded-bl-none border border-purple-500/10 bg-purple-500/5 text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-gray-100"
        }`}
      >
        {isError && !isUser && (
          <HiExclamationTriangle
            className="mt-0.5 flex-shrink-0 text-red-500 dark:text-red-400"
            size={16}
          />
        )}
        <p className="whitespace-pre-wrap break-words leading-relaxed">
          {renderInline(displayedText)}
          {isAnimating && !isUser && !isError && <BlinkingCursor />}
        </p>
      </div>
    </motion.div>
  );
}
