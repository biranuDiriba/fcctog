import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Status = "default" | "info" | "success" | "warning" | "error";
type Mode = "outlined" | "filled" | "plain";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  status?: Status;
  mode?: Mode;
  icon?: keyof typeof LucideIcons;
  helperText?: string;
  fullWidth?: boolean;
  className?: string;
}

export function Input({
  label,
  status = "default",
  mode = "outlined",
  icon,
  helperText,
  fullWidth = true,
  className,
  disabled,
  ...props
}: InputProps) {
  const statusColors: Record<Status, string> = {
    default: "border-gray-300 focus:ring-gray-500",
    info: "border-blue-300 focus:ring-blue-500",
    success: "border-green-300 focus:ring-green-500",
    warning: "border-yellow-300 focus:ring-yellow-500",
    error: "border-red-300 focus:ring-red-500",
  };

  const modeStyles: Record<Mode, string> = {
    outlined: "border bg-white",
    filled: "bg-gray-100 border border-transparent",
    plain: "border-none bg-transparent",
  };

  const Icon = icon ? (LucideIcons[icon] as LucideIcons.LucideIcon) : null;

  return (
    <div className={clsx("flex flex-col gap-1", fullWidth && "w-full")}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div
        className={clsx("relative flex items-center", fullWidth && "w-full")}
      >
        {Icon && (
          <Icon className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
        )}
        <input
          disabled={disabled}
          className={clsx(
            "w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2",
            Icon && "pl-9",
            statusColors[status],
            modeStyles[mode],
            disabled && "bg-gray-100 cursor-not-allowed opacity-70",
            className
          )}
          {...props}
        />
      </div>
      {helperText && (
        <span className="text-xs text-gray-500">{helperText}</span>
      )}
    </div>
  );
}
