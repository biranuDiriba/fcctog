import clsx from "clsx";
import { HTMLAttributes, CSSProperties } from "react";
import { Loader } from "lucide-react";

type Variant = "circular" | "linear";
type Status = "default" | "info" | "success" | "warning" | "error";

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  value?: number; // for linear
  max?: number;
  status?: Status;
  size?: number; // for circular
  style?: CSSProperties;
  className?: string;
}

export function Progress({
  variant = "circular",
  value,
  max = 100,
  status = "default",
  size = 24,
  style,
  className,
  ...props
}: ProgressProps) {
  const isDeterminate = typeof value === "number";
  const percent = Math.min(100, Math.max(0, ((value ?? 0) / max) * 100));

  const statusColors: Record<Status, string> = {
    default: "text-gray-400",
    info: "text-blue-500",
    success: "text-green-500",
    warning: "text-yellow-500",
    error: "text-red-500",
  };

  if (variant === "circular") {
    return (
      <div
        className={clsx("inline-block", statusColors[status], className)}
        style={{
          width: size,
          height: size,
          animation: "spin 1s linear infinite",
          ...style,
        }}
        {...props}
      >
        <Loader style={{ width: "100%", height: "100%" }} />
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "w-full h-2 rounded-full bg-gray-100 overflow-hidden",
        className
      )}
      style={style}
      {...props}
    >
      <div
        className={clsx(
          "h-full rounded-full transition-all",
          statusColors[status]
        )}
        style={{
          width: isDeterminate ? `${percent}%` : "100%",
          animation: isDeterminate
            ? undefined
            : "progress-indeterminate 1.5s infinite linear",
        }}
      />
    </div>
  );
}
