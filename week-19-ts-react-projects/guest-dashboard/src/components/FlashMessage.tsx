//components/FlashMessage.tsx
import { useEffect } from "react";
import { X } from "lucide-react";

type FlashMessageProps = {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number; // in ms
};

export default function FlashMessage({
  message,
  type = "success",
  onClose,
  duration = 10000,
}: FlashMessageProps) {
  // Auto close after `duration`
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const baseStyles =
    " w-fit my-0 mx-auto flex items-center justify-between px-4 py-2 rounded-lg shadow-lg mb-4 text-sm font-medium";
  //   const baseStyles =
  //     "fixed top-4 right-4 flex items-center justify-between px-4 py-2 rounded-lg shadow-lg mb-4 text-sm font-medium";

  const typeStyles = {
    success: "bg-green-100 text-green-800 border border-green-300",
    error: "bg-red-100 text-red-800 border border-red-300",
    info: "bg-blue-100 text-blue-800 border border-blue-300",
  };

  return (
    <div className={`${baseStyles} ${typeStyles[type]}`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-lg">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
