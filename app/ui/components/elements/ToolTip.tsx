import React from "react";

export default function ToolTip({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return <div title={title}> {children}</div>;
}
