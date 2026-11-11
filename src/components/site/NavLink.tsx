import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";
import type { SitePath } from "./navigation";
import { TransitionLink } from "./PageTransition";

/** Header link with a small dot under it on hover; the dot stays on the current page. */
export function NavLink({ to, className, children }: { to: SitePath; className?: string; children: ReactNode }) {
  return (
    <Magnetic strength={0.4}>
      <TransitionLink
        to={to}
        className={cn(
          "relative flex flex-col items-center p-2 after:mt-1.5 after:h-1.5 after:w-1.5 after:scale-0 after:rounded-full after:bg-current after:transition-transform after:duration-300 after:ease-out hover:after:scale-100 data-[status=active]:after:scale-100",
          className,
        )}
      >
        {children}
      </TransitionLink>
    </Magnetic>
  );
}
