// Card.tsx
import { ReactNode } from "react";
import classNames from "classnames";

type CardProps = {
  className?: string;
  children: ReactNode;
};

export function Card({ className, children }: CardProps) {
  return (
    <div className={classNames("bg-white rounded-2xl shadow-md", className)}>
      {children}
    </div>
  );
}

export function CardContent({ className, children }: CardProps) {
  return <div className={classNames('p-d', className)}>{children}</div>;
}