import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FloatingMenu } from "./FloatingMenu";
import { useSmoothScroll } from "./useSmoothScroll";

/** Wrapper for inner pages: smooth scroll, round floating menu and page colours. */
export function PageShell({ children, className }: { children: ReactNode; className?: string }) {
  useSmoothScroll(true);
  return (
    <MotionConfig reducedMotion="user">
      <FloatingMenu />
      <main id="top" className={cn("min-h-screen bg-background text-foreground", className)}>
        {children}
      </main>
    </MotionConfig>
  );
}
