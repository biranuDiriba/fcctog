import clsx from "clsx";
import { CSSProperties, HTMLAttributes, ReactNode } from "react";

type ListType = "ordered" | "unordered";

interface ListProps extends Omit<HTMLAttributes<HTMLUListElement>, "type"> {
  items: (string | ReactNode)[];
  type?: ListType;
  title?: string;
  dense?: boolean;
  divider?: boolean;
  style?: CSSProperties;
  className?: string;
  itemClassName?: string;
  listNone?: boolean;
}

export default function Lists({
  items,
  type = "unordered",
  title,
  dense = false,
  divider = false,
  style,
  className,
  itemClassName,
  listNone = false,
  ...props
}: ListProps) {
  const ListTag = type === "ordered" ? "ol" : "ul";

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>
      )}

      <ListTag
        style={style}
        className={clsx(
          "flex flex-col",
          className,
          type === "ordered"
            ? "list-decimal list-inside text-gray-800 text-base space-y-2"
            : "list-disc list-inside text-gray-800 text-base space-y-2"
        )}
        {...props}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className={clsx(
              listNone ? "list-none" : "list-inside",
              "transition hover:bg-gray-50",
              dense ? "py-2 px-3 text-sm" : "py-3 px-4 text-base",
              divider && index < items.length - 1 && "border-b border-gray-200",
              itemClassName
            )}
          >
            {typeof item === "string" ? <span>{item}</span> : item}
          </li>
        ))}
      </ListTag>
    </div>
  );
}
