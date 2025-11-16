import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
  onClose: (id: number) => void;
  duration?: number;
}

export default function FlashMessage({
  id,
  message,
  type = "info",
  onClose,
  duration = 3000,
}: Props) {
  //Autoclose after "duration"
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose, id]);

  const variants = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 50, scale: 0.95 },
  };

  const typeStyles = {
    success: "bg-green-100 border-green-300 text-green-800",
    error: "bg-red-100 border-red-300 text-red-800",
    info: "bg-blue-100 border-blue-300 text-blue-800",
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.25 }}
      className={`min-w-[260px] max-w-sm px-4 py-3 rounded-xl border shadow-lg flex items-start gap-3 ${typeStyles[type]}`}
    >
      {icons[type]}

      <span className="flex-1 text-sm leading-snug">{message}</span>

      <button onClick={() => onClose(id)}>
        <X className="w-4 h-4 opacity-50 hover:opacity-80" />
      </button>
    </motion.div>
  );
}
