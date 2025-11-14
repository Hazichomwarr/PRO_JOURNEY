import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

type Props = { children: ReactNode };

export default function WrapperWithTransition({ children }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
