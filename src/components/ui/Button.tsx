import { ButtonHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      onClick={props.onClick}
      className={classNames(
        "px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition",
        className
      )}
    >
      {children}
    </button>
  );
}