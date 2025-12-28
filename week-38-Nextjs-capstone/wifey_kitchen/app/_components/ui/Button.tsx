//components/ui/Button.tsx
import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "ui-button hover:ui-button-hover disabled:ui-button-disabled active:ui-button-active",
        variant === "secondary" && "bg-gray-200 text-black hover:bg-gray-300",
        className
      )}
      {...props}
    />
  );
}
