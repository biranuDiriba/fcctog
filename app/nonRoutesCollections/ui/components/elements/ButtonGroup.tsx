import clsx from "clsx";
import { HTMLAttributes, CSSProperties, ReactNode } from "react";

type Direction = "horizontal" | "vertical";

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: Direction;
  gap?: string; // Tailwind gap class like "gap-2", "gap-4"
  style?: CSSProperties;
  className?: string;
}

export function ButtonGroup({
  children,
  direction = "horizontal",
  gap = "gap-2",
  style,
  className,
  ...props
}: ButtonGroupProps) {
  const layout = direction === "horizontal" ? "flex-row" : "flex-col";

  return (
    <div
      style={style}
      className={clsx("flex", layout, gap, className)}
      {...props}
    >
      {children}
    </div>
  );
}
