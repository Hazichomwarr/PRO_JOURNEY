import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export const FormLayout = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-xl p-8 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Multi-Step Form Wizard
        </h1>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        {/* Here the current step (StepOne, StepTwo, etc.) gets rendered */}
        <Outlet />
      </div>
    </div>
  );
};
