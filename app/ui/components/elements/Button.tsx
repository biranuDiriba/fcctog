import clsx from "clsx";
import { ButtonHTMLAttributes, CSSProperties, ElementType } from "react";
import * as LucideIcons from "lucide-react";
type Mode = "contained" | "outlined" | "text";
type Size = "small" | "medium" | "large";
type IconName = keyof typeof LucideIcons;
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: Mode;
  size?: Size;

  startIcon?: IconName;
  endIcon?: IconName;
  loading?: boolean;
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
  IconComponent?: ElementType;
}

export default function Button({
  mode = "contained",
  size = "medium",
  startIcon,
  endIcon,
  loading = false,
  style,
  className,
  children,

  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 ";

  const modeStyles: Record<Mode, string> = {
    contained: "bg-blue-600 text-white hover:bg-blue-700",
    outlined: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    text: "text-blue-600 hover:bg-blue-100",
  };

  const sizeStyles: Record<Size, string> = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-5 py-3 text-lg",
  };

  const LucideStartIcon =
    startIcon && (LucideIcons[startIcon] as LucideIcons.LucideIcon | undefined);
  const LucideEndIcon =
    endIcon && (LucideIcons[endIcon] as LucideIcons.LucideIcon | undefined);

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
        <span className="animate-pulse">Progressing...</span>
      ) : (
        <>
          {LucideStartIcon && <LucideStartIcon className="w-4 h-4 m-2 " />}

          {children}
          {LucideEndIcon && <LucideEndIcon className="w-4 h-4 m-2" />}
        </>
      )}
    </button>
  );
}
