import clsx from "clsx";
import { useEffect } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Status = "default" | "info" | "success" | "warning" | "error";

interface SnackbarProps {
  open: boolean;
  message: string;
  status?: Status;
  duration?: number;
  action?: React.ReactNode;
  onClose?: () => void;
  position?: "bottom-left" | "bottom-center";
  className?: string;
}

export function Snackbar({
  open,
  message,
  status = "default",
  duration = 4000,
  action,
  onClose,
  position = "bottom-left",
  className,
}: SnackbarProps) {
  useEffect(() => {
    if (!open || !onClose) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  const statusColors: Record<Status, string> = {
    default: "bg-gray-800 text-white",
    info: "bg-blue-600 text-white",
    success: "bg-green-600 text-white",
    warning: "bg-yellow-500 text-black",
    error: "bg-red-600 text-white",
  };

  const statusIcons: Record<Status, LucideIcon> = {
    default: LucideIcons.Info,
    info: LucideIcons.Info,
    success: LucideIcons.CheckCircle2,
    warning: LucideIcons.AlertTriangle,
    error: LucideIcons.XCircle,
  };

  const Icon = statusIcons[status];

  const positionStyles: Record<typeof position, string> = {
    "bottom-left": "left-4 bottom-4",
    "bottom-center": "left-1/2 -translate-x-1/2 bottom-4",
  };

  return (
    <div
      className={clsx(
        "fixed z-50 px-4 py-3 rounded-md shadow-lg flex items-center gap-3 min-w-[240px] max-w-sm",
        statusColors[status],
        positionStyles[position],
        className
      )}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span className="flex-1 text-sm">{message}</span>
      {action && <div className="ml-2">{action}</div>}
    </div>
  );
}
