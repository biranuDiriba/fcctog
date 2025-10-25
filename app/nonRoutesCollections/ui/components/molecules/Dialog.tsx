import clsx from "clsx";
import { useEffect } from "react";
import { Backdrop } from "./Backdrop";

type Size = "sm" | "md" | "lg" | "xl";
type Mode = "contained" | "outlined" | "soft";
type Status = "default" | "info" | "success" | "warning" | "error";

interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  size?: Size;
  mode?: Mode;
  status?: Status;
  zIndex?: number;
  className?: string;
  contentClassName?: string;
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  size = "md",
  mode = "contained",
  status = "default",
  zIndex = 50,
  className,
  contentClassName,
}: DialogProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  const sizeStyles: Record<Size, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
  };

  const statusColors: Record<Status, string> = {
    default: "bg-white text-gray-800",
    info: "bg-blue-50 text-blue-800",
    success: "bg-green-50 text-green-800",
    warning: "bg-yellow-50 text-yellow-800",
    error: "bg-red-50 text-red-800",
  };

  const modeStyles: Record<Mode, string> = {
    contained: "",
    outlined: "border border-gray-300",
    soft: "bg-opacity-10",
  };

  return (
    <>
      <Backdrop visible zIndex={zIndex - 1} onClick={onClose} />
      <div
        className={clsx(
          "fixed inset-0 z-[var(--z)] flex items-center justify-center     ",
          className
        )}
        style={{ ["--z" as any]: zIndex }}
      >
        <div
          className={clsx(
            "w-full rounded-lg shadow-lg transition-all max-h-[75%] overflow-auto",
            sizeStyles[size],
            statusColors[status],
            modeStyles[mode],
            contentClassName
          )}
        >
          <div className="sticky top-0 bg-inherit">
            {title && (
              <h2 className="text-lg font-semibold mb-2 sticky top-0 p-4">
                {title}
              </h2>
            )}
          </div>
          {description && (
            <p className="text-sm text-gray-600    p-6">{description}</p>
          )}
          {children}
          {actions && (
            <div className="mt-6 flex justify-end gap-2 sticky bottom-0 bg-inherit  p-4">
              {actions}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
