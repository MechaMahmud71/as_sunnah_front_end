// Input.tsx
import { InputHTMLAttributes } from "react";
import classNames from "classnames";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={classNames(
        "w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-black bg-white",
        className
      )}
    />
  );
}