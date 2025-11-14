import { useFlashStore } from "../../store/flashStore";
import FlashMessage from "./FlashMessage";

export default function FlashRenderer() {
  const flashes = useFlashStore((s) => s.flashes);
  const removeFlash = useFlashStore((s) => s.removeFlash);

  return (
    <div>
      {flashes.map((f) => (
        <FlashMessage
          key={f.id}
          id={f.id}
          message={f.message}
          type={f.type}
          onClose={removeFlash}
        />
      ))}
    </div>
  );
}
