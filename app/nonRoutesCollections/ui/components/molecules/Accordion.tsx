import { useState } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

type Mode = "contained" | "outlined" | "soft";

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  mode?: Mode;
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  mode = "contained",
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(() =>
    items.filter((item) => item.defaultOpen).map((item) => item.id)
  );

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      allowMultiple
        ? prev.includes(id)
          ? prev.filter((i) => i !== id)
          : [...prev, id]
        : prev.includes(id)
        ? []
        : [id]
    );
  };

  const modeStyles: Record<Mode, string> = {
    contained: "bg-white",
    outlined: "bg-transparent",
    soft: "bg-gray-50",
  };

  return (
    <div className={clsx("w-full", modeStyles[mode], className)}>
      {items.map(({ id, title, content }, index) => {
        const isOpen = openIds.includes(id);
        const isLast = index === items.length - 1;
        return (
          <div key={id}>
            <button
              onClick={() => toggle(id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-gray-800 hover:bg-gray-100"
            >
              <span>{title}</span>
              <ChevronDown
                className={clsx(
                  "w-5 h-5 transform transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={clsx(
                "px-4 pb-4 text-sm text-gray-600 transition-all overflow-hidden",
                isOpen ? "max-h-screen" : "max-h-0"
              )}
              style={{ transitionDuration: "300ms" }}
            >
              {isOpen && content}
            </div>
            {!isLast && <div className="border-t border-gray-200 mx-4" />}
          </div>
        );
      })}
    </div>
  );
}
