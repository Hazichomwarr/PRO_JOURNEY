//pages/NotFound.tsx
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center font-semibold">
      <div className="mt-4">
        {/* <Frown size={64} color="gray" /> */}
        <AlertTriangle size={64} color="red" />
      </div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
