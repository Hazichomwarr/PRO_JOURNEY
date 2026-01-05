// components/ui/Input.tsx
import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export function Input({ error, className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        "ui-input focus:ui-input-focus disabled:ui-input-disabled",
        error && "border-red-500 ring-red-500",
        className
      )}
      {...props}
    />
  );
}
