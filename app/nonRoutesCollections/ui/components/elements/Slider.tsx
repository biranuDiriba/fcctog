import clsx from "clsx";
import { CSSProperties, HTMLAttributes } from "react";

type Status = "default" | "success" | "warning" | "error" | "info";

interface SliderProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "onChange"> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  status?: Status;
  style?: CSSProperties;
  className?: string;
  labelClassName?: string;
  trackClassName?: string;
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  status = "default",
  style,
  className,
  labelClassName,
  trackClassName,
  ...props
}: SliderProps) {
  const statusStyles: Record<Status, string> = {
    default: "accent-blue-600",
    success: "accent-green-600",
    warning: "accent-yellow-500",
    error: "accent-red-600",
    info: "accent-blue-600",
  };

  return (
    <div className={clsx("flex flex-col gap-1", className)} style={style}>
      {label && (
        <label className={clsx("text-sm font-medium", labelClassName)}>
          {label}
        </label>
      )}
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className={clsx(
          "w-full h-2 rounded-lg cursor-pointer",
          statusStyles[status],
          trackClassName
        )}
        {...props}
      />
      <span className="text-xs text-gray-500">Value: {value}</span>
    </div>
  );
}
