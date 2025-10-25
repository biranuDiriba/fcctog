import clsx from "clsx";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { HTMLAttributes, CSSProperties } from "react";

type Mode = "solid" | "soft" | "outline";
type Size = "small" | "medium" | "large";
type Status = "default" | "success" | "warning" | "error" | "info";
type IconName = keyof typeof LucideIcons;

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  icon?: IconName;
  status?: Status;
  mode?: Mode;
  size?: Size;
  selected?: boolean;
  onRemove?: () => void;
  style?: CSSProperties;
  className?: string;
  iconClassName?: string;
  removeIcon?: IconName;
}

export function Chip({
  text,
  icon,
  status = "default",
  mode = "solid",
  size = "medium",
  selected = false,
  onRemove,
  style,
  className,
  iconClassName,
  removeIcon = "X",
  ...props
}: ChipProps) {
  const sizeStyles: Record<Size, string> = {
    small: "px-2 py-0.5 text-xs",
    medium: "px-3 py-1 text-sm",
    large: "px-4 py-1.5 text-base",
  };

  const statusColors: Record<
    Status,
    { bg: string; text: string; border: string }
  > = {
    default: {
      bg: "bg-gray-200",
      text: "text-gray-800",
      border: "border-gray-300",
    },
    success: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-300",
    },
    warning: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-300",
    },
    error: { bg: "bg-red-100", text: "text-red-800", border: "border-red-300" },
    info: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-300",
    },
  };

  const modeStyles: Record<Mode, string> = {
    solid: `${statusColors[status].bg} ${statusColors[status].text}`,
    soft: `bg-opacity-20 ${statusColors[status].text}`,
    outline: `border ${statusColors[status].border} ${statusColors[status].text}`,
  };

  const LucideIcon = icon ? (LucideIcons[icon] as LucideIcon) : undefined;
  const RemoveIcon = LucideIcons[removeIcon] as LucideIcon;

  return (
    <div
      style={style}
      className={clsx(
        "inline-flex items-center gap-1 rounded-md font-medium transition",
        sizeStyles[size],
        modeStyles[mode],
        selected && "ring-2 ring-offset-1 ring-blue-500",
        className
      )}
      {...props}
    >
      {LucideIcon && <LucideIcon className={clsx("w-4 h-4", iconClassName)} />}
      <span>{text}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 rounded-full hover:bg-gray-300 p-0.5"
        >
          <RemoveIcon className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
