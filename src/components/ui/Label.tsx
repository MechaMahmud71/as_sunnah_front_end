import { ReactNode } from "react";

type LabelProps = {
  htmlFor: string;
  children: ReactNode;
  className?: string;
};

export function Label({ htmlFor, children, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={"block text-sm font-medium text-black"}
    >
      {children}
    </label>
  );
}