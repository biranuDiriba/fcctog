import clsx from "clsx";
import { CSSProperties, HTMLAttributes } from "react";

type Orientation = "horizontal" | "vertical";

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: Orientation;
  label?: string;
  thickness?: string; // e.g. "h-px", "h-0.5", "w-px"
  color?: string; // Tailwind color class like "bg-gray-300"
  style?: CSSProperties;
  className?: string;
  labelClassName?: string;
}

export function Divider({
  orientation = "horizontal",
  label,
  thickness,
  color = "bg-gray-300",
  style,
  className,
  labelClassName,
  ...props
}: DividerProps) {
  const isHorizontal = orientation === "horizontal";
  const defaultThickness = isHorizontal ? "h-px" : "w-px";
  const base = isHorizontal ? "w-full" : "h-full";

  return (
    <div
      className={clsx("flex flex-col items-center", className)}
      style={style}
      {...props}
    >
      {label && (
        <span className={clsx("text-xs text-gray-500 mb-1", labelClassName)}>
          {label}
        </span>
      )}
      <div className={clsx(base, thickness || defaultThickness, color)} />
    </div>
  );
}
