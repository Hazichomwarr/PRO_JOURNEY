import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      {/* 
        The 'animate-spin' class from Tailwind CSS applies a smooth rotation.
        You can customize size and color with other utility classes.
      */}
      <Loader2 className="animate-spin w-12 h-12 text-blue-500" />
    </div>
  );
}
