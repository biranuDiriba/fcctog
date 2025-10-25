import clsx from "clsx";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes, CSSProperties } from "react";

type IconName = keyof typeof LucideIcons;
type Mode = "contained" | "outlined" | "soft";
type Size = "small" | "medium" | "large";
type Status = "default" | "success" | "warning" | "error" | "info";
type Position = "bottom-right" | "bottom-left" | "top-right" | "top-left";

interface FloatingActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  mode?: Mode;
  size?: Size;
  status?: Status;
  position?: Position;
  style?: CSSProperties;
  className?: string;
}

export default function FAB({
  icon,
  mode = "contained",
  size = "medium",
  status = "default",
  position = "bottom-right",
  style,
  className,
  ...props
}: FloatingActionButtonProps) {
  const Icon = LucideIcons[icon] as LucideIcon;

  const sizeStyles: Record<Size, string> = {
    small: "w-10 h-10 text-sm",
    medium: "w-12 h-12 text-base",
    large: "w-14 h-14 text-lg",
  };

  const statusColors: Record<
    Status,
    { bg: string; border: string; text: string }
  > = {
    default: {
      bg: "bg-gray-600",
      border: "border-gray-700",
      text: "text-white",
    },
    success: {
      bg: "bg-green-600",
      border: "border-green-700",
      text: "text-white",
    },
    warning: {
      bg: "bg-yellow-500",
      border: "border-yellow-600",
      text: "text-white",
    },
    error: { bg: "bg-red-600", border: "border-red-700", text: "text-white" },
    info: { bg: "bg-blue-600", border: "border-blue-700", text: "text-white" },
  };

  const modeStyles: Record<Mode, string> = {
    contained: `${statusColors[status].bg} ${statusColors[status].text}`,
    outlined: `border ${statusColors[status].border} ${statusColors[status].text}`,
    soft: `bg-opacity-20 ${statusColors[status].text}`,
  };

  const positionStyles: Record<Position, string> = {
    "bottom-right": "fixed bottom-4 right-4",
    "bottom-left": "fixed bottom-4 left-4",
    "top-right": "fixed top-4 right-4",
    "top-left": "fixed top-4 left-4",
  };

  return (
    <button
      style={style}
      className={clsx(
        "rounded-full shadow-lg flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-offset-2 z-50",
        sizeStyles[size],
        modeStyles[mode],
        positionStyles[position],
        className
      )}
      {...props}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
