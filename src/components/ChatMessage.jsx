import { motion } from "framer-motion";
import { HiExclamationTriangle } from "react-icons/hi2";

export default function ChatMessage({ message, isUser, isError }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      <div
        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm flex items-start gap-2 ${
          isUser
            ? "bg-ember text-white rounded-br-none"
            : isError
            ? "bg-red-100 text-red-800 rounded-bl-none dark:bg-red-900/30 dark:text-red-300"
            : "bg-gray-200 text-gray-900 rounded-bl-none dark:bg-gray-700 dark:text-gray-100"
        }`}
      >
        {isError && !isUser && (
          <HiExclamationTriangle className="flex-shrink-0 mt-0.5 text-red-500 dark:text-red-400" size={16} />
        )}
        <p className="leading-relaxed">{message}</p>
      </div>
    </motion.div>
  );
}
