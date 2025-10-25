import clsx from "clsx";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CSSProperties, HTMLAttributes } from "react";

type IconName = keyof typeof LucideIcons;
type Status = "default" | "success" | "warning" | "error" | "info";

interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: IconName;
  rightIcon?: IconName;
  status?: Status;
  dense?: boolean;
  divider?: boolean;
  selected?: boolean;
  style?: CSSProperties;
  className?: string;
  iconClassName?: string;
  rightIconClassName?: string;
}

export function ListItem({
  title,
  description,
  icon,
  rightIcon,
  status = "default",
  dense = false,
  divider = false,
  selected = false,
  style,
  className,
  iconClassName,
  rightIconClassName,
  ...props
}: ListItemProps) {
  const LeftIcon = icon ? (LucideIcons[icon] as LucideIcon) : undefined;
  const RightIcon = rightIcon
    ? (LucideIcons[rightIcon] as LucideIcon)
    : undefined;

  const statusStyles: Record<Status, string> = {
    default: "text-gray-700",
    success: "text-green-600",
    warning: "text-yellow-600",
    error: "text-red-600",
    info: "text-blue-600",
  };

  return (
    <div
      style={style}
      className={clsx(
        "flex items-center justify-between gap-3 cursor-pointer transition hover:bg-gray-50",
        dense ? "py-2 px-3 text-sm" : "py-3 px-4 text-base",
        divider && "border-b border-gray-200",
        selected && "bg-blue-50",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        {LeftIcon && (
          <LeftIcon
            className={clsx(
              "w-5 h-5 mt-0.5",
              statusStyles[status],
              iconClassName
            )}
          />
        )}
        <div className="flex flex-col">
          <span className="font-medium">{title}</span>
          {description && (
            <span className="text-sm text-gray-500">{description}</span>
          )}
        </div>
      </div>
      {RightIcon && (
        <RightIcon
          className={clsx("w-4 h-4 text-gray-400", rightIconClassName)}
        />
      )}
    </div>
  );
}
