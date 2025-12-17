//components/ui/ModalShell.tsx
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  widthClass?: string; // optional override
}

export default function ModalShell({
  open,
  onClose,
  children,
  widthClass = "max-w-lg",
}: ModalShellProps) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        className="flex fixed inset-0 z-50 items-center justify-center bg-black/50"
        role="dialog"
        aria-modal="true"
        // onMouseDown={onClose}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/40"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Content */}
        <motion.div
          className={`relative bg-white rounded-2xl shadow-2xl w-full ${widthClass} p-6 m-4`}
          onMouseDown={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
