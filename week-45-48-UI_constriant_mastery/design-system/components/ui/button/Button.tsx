// components/ui/button/Button.tsx
import React from "react";
import { variants } from "./buttonVariants";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  children: React.ReactNode;
};

export function Button({ variant = "primary", children }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium cursor-pointer active:scale-95 transition-colors duration-200";

  return <button className={`${base} ${variants[variant]}`}>{children}</button>;
}
