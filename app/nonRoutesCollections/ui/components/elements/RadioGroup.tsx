import clsx from "clsx";
import { CSSProperties, HTMLAttributes } from "react";
import { RadioButton } from "./RadioButton";

type Status = "default" | "success" | "warning" | "error" | "info";
type Size = "small" | "medium" | "large";
type Direction = "horizontal" | "vertical";

interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  status?: Status;
  size?: Size;
  direction?: Direction;
  style?: CSSProperties;
  className?: string;
  labelClassName?: string;
  radioClassName?: string;
}

export function RadioGroup({
  options,
  value,
  onChange,
  status = "default",
  size = "medium",
  direction = "vertical",
  style,
  className,
  labelClassName,
  radioClassName,
  ...props
}: RadioGroupProps) {
  const layout =
    direction === "horizontal" ? "flex-row gap-4" : "flex-col gap-2";

  return (
    <div style={style} className={clsx("flex", layout, className)} {...props}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          checked={value === option.value}
          onChange={() => onChange(option.value)}
          status={status}
          size={size}
          className={radioClassName}
          labelClassName={labelClassName}
        />
      ))}
    </div>
  );
}
