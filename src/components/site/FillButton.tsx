import { useAnimate } from "framer-motion";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  /** Classes for the circle that rises through the button on hover. */
  fillClassName?: string;
  magnetic?: boolean;
  wrapperClassName?: string | undefined;
};

/** Link-button with a colour circle that rises from below on hover and exits upward. */
export function FillButton({
  children,
  className,
  fillClassName = "bg-brand",
  magnetic = true,
  wrapperClassName,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: Props) {
  const [scope, animate] = useAnimate();

  const btn = (
    <a
      {...rest}
      onMouseEnter={(e) => {
        animate(scope.current, { top: ["100%", "-25%"] }, { duration: 0.4, ease: "easeIn" });
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        animate(scope.current, { top: "-150%" }, { duration: 0.4, ease: "easeOut" });
        onMouseLeave?.(e);
      }}
      className={cn("group relative inline-flex items-center justify-center overflow-hidden", className)}
    >
      <span
        ref={scope}
        aria-hidden
        className={cn("absolute left-1/2 top-full h-[150%] w-[125%] -translate-x-1/2 rounded-[50%]", fillClassName)}
      />
      <span className="relative z-10 inline-flex items-center gap-2 transition-colors duration-300">{children}</span>
    </a>
  );

  return magnetic ? <Magnetic className={wrapperClassName}>{btn}</Magnetic> : btn;
}
