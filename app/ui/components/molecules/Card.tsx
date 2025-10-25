import clsx from "clsx";
import { HTMLAttributes, CSSProperties } from "react";

type Variant = "elevated" | "outlined" | "filled";
type Status = "default" | "info" | "success" | "warning" | "error";
type Mode = "vertical" | "horizontal";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  media?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  variant?: Variant;
  status?: Status;
  mode?: Mode;
  elevation?: number;
  rounded?: string;
  style?: CSSProperties;
  className?: string;
}

export default function Card({
  header,
  media,
  actions,
  children,
  variant = "elevated",
  status = "default",
  mode = "vertical",
  elevation = 1,
  rounded = "rounded-lg",
  style,
  className,
  ...props
}: CardProps) {
  const variantStyles: Record<Variant, string> = {
    elevated: "shadow-md bg-white",
    outlined: "border border-gray-200 bg-white",
    filled: "bg-gray-50",
  };

  const statusAccent: Record<Status, string> = {
    default: "",
    info: "border-l-4 border-blue-500",
    success: "border-l-4 border-green-500",
    warning: "border-l-4 border-yellow-500",
    error: "border-l-4 border-red-500",
  };

  const layout = mode === "horizontal" ? "flex flex-row" : "flex flex-col";

  return (
    <div
      className={clsx(
        "w-full overflow-hidden",
        layout,
        variantStyles[variant],
        statusAccent[status],
        rounded,
        `shadow-${elevation}`,
        className
      )}
      style={style}
      {...props}
    >
      {media && (
        <div className={clsx(mode === "horizontal" ? "w-1/3" : "w-full")}>
          {media}
        </div>
      )}
      <div className="flex-1 flex flex-col">
        {header && <div className="px-4 pt-4">{header}</div>}
        {children && <div className="px-4 py-2 flex-1">{children}</div>}
        {actions && <div className="px-4 pb-4 mt-auto">{actions}</div>}
      </div>
    </div>
  );
}
