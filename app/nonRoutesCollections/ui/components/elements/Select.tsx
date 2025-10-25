import clsx from "clsx";

type Size = "small" | "medium" | "large";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  placeholder?: string;
  size?: Size;
  disabled?: boolean;
  error?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Select({
  label,
  options,
  placeholder = "Select an option",
  size = "medium",
  disabled = false,
  error = false,
  value,
  onChange,
  className,
}: SelectProps) {
  const base =
    "block w-full rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-3 py-2 text-base",
    large: "px-4 py-3 text-lg",
  };

  const stateStyles = clsx({
    "bg-white text-gray-900 border border-gray-300 focus:ring-blue-600":
      !error && !disabled,
    "border-red-500 focus:ring-red-500": error,
    "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed":
      disabled,
  });

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <select
        className={clsx(base, sizeStyles[size], stateStyles, className)}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
