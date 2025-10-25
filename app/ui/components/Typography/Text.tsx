import clsx from "clsx";
import {
  ReactNode,
  CSSProperties,
  HTMLAttributes,
  ElementType,
  JSX,
} from "react";

type Variant =
  | "displayLarge"
  | "displayMedium"
  | "displaySmall"
  | "headlineLarge"
  | "headlineMedium"
  | "headlineSmall"
  | "titleLarge"
  | "titleMedium"
  | "titleSmall"
  | "labelLarge"
  | "labelMedium"
  | "labelSmall"
  | "bodyLarge"
  | "bodyMedium"
  | "bodySmall";

interface TextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: Variant;
  style?: CSSProperties;
  className?: string;
}

export default function Text({
  children,
  variant = "bodyMedium",
  style,
  className,
  ...props
}: TextProps) {
  const variantStyles: Record<Variant, string> = {
    displayLarge: "text-5xl font-light tracking-tight",
    displayMedium: "text-4xl font-light tracking-tight",
    displaySmall: "text-3xl font-normal tracking-tight",
    headlineLarge: "text-2xl font-normal",
    headlineMedium: "text-xl font-normal",
    headlineSmall: "text-lg font-medium",
    titleLarge: "text-lg font-semibold",
    titleMedium: "text-base font-medium",
    titleSmall: "text-sm font-medium",
    labelLarge: "text-sm font-medium capitalize",
    labelMedium: "text-xs font-medium capitalize",
    labelSmall: "text-[11px] font-medium capitalize",
    bodyLarge: "text-base font-normal",
    bodyMedium: "text-sm font-normal",
    bodySmall: "text-xs font-normal",
  };

  const tagMap: Record<Variant, keyof JSX.IntrinsicElements> = {
    displayLarge: "h1",
    displayMedium: "h1",
    displaySmall: "h2",
    headlineLarge: "h2",
    headlineMedium: "h3",
    headlineSmall: "h4",
    titleLarge: "h5",
    titleMedium: "h6",
    titleSmall: "span",
    labelLarge: "label",
    labelMedium: "label",
    labelSmall: "label",
    bodyLarge: "p",
    bodyMedium: "p",
    bodySmall: "span",
  };

  const Tag = tagMap[variant] as ElementType;

  return (
    <Tag
      style={style}
      className={clsx(variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
