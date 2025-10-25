import clsx from "clsx";
import { ButtonHTMLAttributes, CSSProperties } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Mode = "contained" | "outlined" | "text";
type Size = "small" | "medium" | "large";
type IconName = keyof typeof LucideIcons;

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  mode?: Mode;
  size?: Size;
  loading?: boolean;
  style?: CSSProperties;
  className?: string;
}

export function IconButton({
  icon,
  mode = "contained",
  size = "medium",
  loading = false,
  style,
  className,
  ...props
}: IconButtonProps) {
  const base =
    "inline-flex items-center justify-center  rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const modeStyles: Record<Mode, string> = {
    contained: "bg-blue-600 text-white hover:bg-blue-700",
    outlined: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    text: "text-blue-600 hover:bg-blue-100",
  };

  const sizeStyles: Record<Size, string> = {
    small: "p-2 text-sm",
    medium: "p-3 text-base",
    large: "p-4 text-lg",
  };

  const LucideIcon = LucideIcons[icon] as LucideIcon | undefined;
  const LucideLoader = LucideIcons["Loader2"];

  return (
    <button
      style={style}
      className={clsx(
        base,
        modeStyles[mode],
        sizeStyles[size],
        (loading || props.disabled) && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <LucideLoader className="w-5 h-5 animate-spin" />
      ) : (
        LucideIcon && <LucideIcon className="w-5 h-5" />
      )}
    </button>
  );
}
