import clsx from "clsx";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { HTMLAttributes, CSSProperties } from "react";

type Status = "info" | "success" | "warning" | "error";
type Mode = "contained" | "outlined" | "soft";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  status?: Status;
  mode?: Mode;
  onClose?: () => void;
  style?: CSSProperties;
  className?: string;
}

export function Alert({
  title,
  description,
  status = "info",
  mode = "contained",
  onClose,
  style,
  className,
  ...props
}: AlertProps) {
  const defaultIcons: Record<Status, LucideIcon> = {
    info: LucideIcons.Info,
    success: LucideIcons.CheckCircle2,
    warning: LucideIcons.AlertTriangle,
    error: LucideIcons.XCircle,
  };

  const Icon = defaultIcons[status];

  const baseColors: Record<
    Status,
    { bg: string; border: string; text: string }
  > = {
    info: {
      bg: "bg-blue-50",
      border: "border-blue-300",
      text: "text-blue-800",
    },
    success: {
      bg: "bg-green-50",
      border: "border-green-300",
      text: "text-green-800",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-300",
      text: "text-yellow-800",
    },
    error: { bg: "bg-red-50", border: "border-red-300", text: "text-red-800" },
  };

  const modeStyles: Record<Mode, string> = {
    contained: `${baseColors[status].bg} ${baseColors[status].text}`,
    outlined: `border ${baseColors[status].border} ${baseColors[status].text} bg-transparent`,
    soft: `bg-opacity-10 ${baseColors[status].text}`,
  };

  return (
    <div
      style={style}
      className={clsx(
        "w-full rounded-md p-4 flex items-center gap-3  ",
        modeStyles[mode],
        className
      )}
      {...props}
    >
      <Icon className="w-6 h-6 mt-0.5 shrink-0" />
      <div className="flex-1">
        {title && <div className="font-semibold">{title}</div>}
        {description && <div className="text-sm">{description}</div>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 text-inherit hover:opacity-70"
          aria-label="Close alert"
        >
          <LucideIcons.X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
