import clsx from "clsx";
import { CSSProperties, HTMLAttributes } from "react";

type Mode = "dim" | "blur" | "transparent";

interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
  mode?: Mode;
  zIndex?: number;
  style?: CSSProperties;
  className?: string;
}

export function Backdrop({
  visible = true,
  mode = "dim",
  zIndex = 50,
  style,
  className,
  ...props
}: BackdropProps) {
  if (!visible) return null;

  const modeStyles: Record<Mode, string> = {
    dim: "bg-black bg-opacity-50",
    blur: "backdrop-blur-sm bg-black bg-opacity-10",
    transparent: "bg-transparent",
  };

  return (
    <div
      className={clsx(
        "fixed inset-0 w-full h-full transition-opacity",
        modeStyles[mode],
        className
      )}
      style={{ zIndex, ...style }}
      {...props}
    />
  );
}
