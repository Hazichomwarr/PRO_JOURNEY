// components/ui/stack/Stack.tsx
import React from "react";

type StackProps = {
  children: React.ReactNode;
  gap?: number;
  className?: string;
};

const gapMap: Record<number, string> = {
  2: "gap-2",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
};

export function Stack({ children, gap = 4, className }: StackProps) {
  return (
    <div className={`flex flex-col ${gapMap[gap]} ${className || ""}`}>
      {children}
    </div>
  );
}
