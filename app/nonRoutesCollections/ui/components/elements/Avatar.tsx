import clsx from "clsx";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CSSProperties, HTMLAttributes } from "react";

type IconName = keyof typeof LucideIcons;
type Size = "small" | "medium" | "large";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  icon?: IconName;
  text?: string;
  size?: Size;
  style?: CSSProperties;
  className?: string;
  imageClassName?: string;
}

export function Avatar({
  src,
  alt = "avatar",
  icon,
  text,
  size = "medium",
  style,
  className,
  imageClassName,
  ...props
}: AvatarProps) {
  const sizeStyles: Record<Size, string> = {
    small: "w-8 h-8 text-xs",
    medium: "w-10 h-10 text-sm",
    large: "w-14 h-14 text-base",
  };

  const LucideIcon = icon ? (LucideIcons[icon] as LucideIcon) : undefined;

  return (
    <div
      style={style}
      className={clsx(
        "inline-flex items-center justify-center rounded-full overflow-hidden bg-gray-200 text-gray-700 font-semibold",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={clsx("object-cover w-full h-full", imageClassName)}
        />
      ) : LucideIcon ? (
        <LucideIcon className="w-5 h-5" />
      ) : text ? (
        <span>{text}</span>
      ) : (
        <span>?</span>
      )}
    </div>
  );
}
