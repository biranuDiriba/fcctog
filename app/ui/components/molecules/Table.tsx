import clsx from "clsx";

type Variant = "outlined" | "filled" | "plain";
type Status = "default" | "info" | "success" | "warning" | "error";

interface Column {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  width?: string;
}

interface TableProps {
  columns: Column[];
  rows: Record<string, any>[];
  variant?: Variant;
  status?: Status;
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  className?: string;
}

export function Table({
  columns,
  rows,
  variant = "outlined",
  status = "default",
  striped = true,
  hoverable = true,
  compact = false,
  className,
}: TableProps) {
  const variantStyles: Record<Variant, string> = {
    outlined: "border border-gray-200",
    filled: "bg-gray-50",
    plain: "",
  };

  const statusAccent: Record<Status, string> = {
    default: "",
    info: "border-l-4 border-blue-500",
    success: "border-l-4 border-green-500",
    warning: "border-l-4 border-yellow-500",
    error: "border-l-4 border-red-500",
  };

  return (
    <div
      className={clsx(
        "w-full overflow-x-auto",
        statusAccent[status],
        className
      )}
    >
      <table className={clsx("w-full text-sm", variantStyles[variant])}>
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={clsx(
                  "px-4 py-2 font-medium",
                  col.align === "center" && "text-center",
                  col.align === "right" && "text-right"
                )}
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={clsx(
                striped && i % 2 === 1 && "bg-gray-50",
                hoverable && "hover:bg-gray-100"
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={clsx(
                    "px-4",
                    compact ? "py-1" : "py-2",
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right"
                  )}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
