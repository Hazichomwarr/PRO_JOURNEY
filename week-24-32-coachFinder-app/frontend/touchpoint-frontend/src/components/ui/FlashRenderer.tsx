//components/ui/FlashRenderer.tsx
import { useFlashStore } from "../../store/flashStore";
import FlashMessage from "./FlashMessage";
import { AnimatePresence } from "framer-motion";

export default function FlashRenderer() {
  const flashes = useFlashStore((s) => s.flashes);
  const removeFlash = useFlashStore((s) => s.removeFlash);

  return (
    <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-3">
      <AnimatePresence>
        {flashes.map((f) => (
          <FlashMessage
            key={f.id}
            id={f.id}
            message={f.message}
            type={f.type}
            onClose={() => removeFlash(f.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
