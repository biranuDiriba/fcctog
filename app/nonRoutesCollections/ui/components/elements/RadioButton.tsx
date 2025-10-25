import clsx from "clsx";
import { InputHTMLAttributes, CSSProperties } from "react";

type Status = "default" | "success" | "warning" | "error" | "info";
type Size = "small" | "medium" | "large";

interface RadioButtonProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  status?: Status;
  size?: Size;
  style?: CSSProperties;
  className?: string;
  labelClassName?: string;
}

export function RadioButton({
  label,
  status = "default",
  size = "medium",
  style,
  className,
  labelClassName,
  ...props
}: RadioButtonProps) {
  const sizeStyles: Record<Size, string> = {
    small: "w-4 h-4",
    medium: "w-5 h-5",
    large: "w-6 h-6",
  };

  const statusStyles: Record<Status, string> = {
    default: "text-gray-600 focus:ring-gray-400",
    success: "text-green-600 focus:ring-green-400",
    warning: "text-yellow-600 focus:ring-yellow-400",
    error: "text-red-600 focus:ring-red-400",
    info: "text-blue-600 focus:ring-blue-400",
  };

  return (
    <label className={clsx("inline-flex items-center gap-2", labelClassName)}>
      <input
        type="radio"
        style={style}
        className={clsx(
          "border-gray-300 focus:ring-2",
          sizeStyles[size],
          statusStyles[status],
          className
        )}
        {...props}
      />
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}
