import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useMemo } from "react";
import { useLocation } from "react-router-dom";

type Props = { children: ReactNode };

export default function WrapperWithTransition({ children }: Props) {
  const location = useLocation();

  // Animation Variants
  const backToFront = {
    initial: { opacity: 0, scale: 0.92, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.92, y: -10 },
  };

  const rightToLeft = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  // Randomly pick a variant per route
  const chosenVariant = useMemo(() => {
    const random = Math.random() < 0.5;
    return random ? backToFront : rightToLeft;
  }, [location.pathname]); // re-runs only when the route changes

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={chosenVariant.initial}
        animate={chosenVariant.animate}
        exit={chosenVariant.exit}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
