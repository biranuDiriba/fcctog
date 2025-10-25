import clsx from "clsx";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { HTMLAttributes, CSSProperties } from "react";

type IconName = keyof typeof LucideIcons;
type Status = "default" | "success" | "warning" | "error" | "info";

interface BadgeOverlayProps extends HTMLAttributes<HTMLDivElement> {
  icon: IconName;
  count?: number;
  status?: Status;
  className?: string;
  style?: CSSProperties;
  iconClassName?: string;
  badgeClassName?: string;
}

export function Badge({
  icon,
  count = 0,
  status = "error",
  className,
  style,
  iconClassName,
  badgeClassName,
  ...props
}: BadgeOverlayProps) {
  const Icon = LucideIcons[icon] as LucideIcon;

  const statusStyles: Record<Status, string> = {
    default: "bg-gray-500",
    success: "bg-green-600",
    warning: "bg-yellow-500",
    error: "bg-red-600",
    info: "bg-blue-600",
  };

  return (
    <div
      style={style}
      className={clsx("relative inline-block", className)}
      {...props}
    >
      <Icon className={clsx("w-6 h-6 text-gray-700", iconClassName)} />
      {count > 0 && (
        <span
          className={clsx(
            "absolute -top-2 left-3 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full",
            statusStyles[status],
            badgeClassName
          )}
        >
          {count}
        </span>
      )}
    </div>
  );
}
