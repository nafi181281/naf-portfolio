import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { animate } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { easeInOut } from "./motion";
import { firstVisit, pageLabel, type SitePath } from "./navigation";

type Ctx = { go: (to: SitePath) => void };
const TransitionContext = createContext<Ctx | null>(null);

const BELOW = "100vh";
const COVER = "-12vh";
const ABOVE = "-124vh";

/**
 * Dark curtain with curved edges that rises over the page showing the next page's name,
 * swaps the page underneath, then sweeps away upward.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [startCovered] = useState(() => pathname !== "/");
  const [label, setLabel] = useState(() => pageLabel(pathname));
  const curtain = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLParagraphElement>(null);
  const busy = useRef(false);

  const reveal = useCallback(async (delay = 0.1) => {
    const el = curtain.current;
    const t = text.current;
    if (!el || !t) return;
    await Promise.all([
      animate(t, { opacity: 0 }, { duration: 0.3, delay }),
      animate(el, { y: [COVER, ABOVE] }, { duration: 0.85, ease: easeInOut, delay: delay + 0.1 }),
    ]);
    el.style.transform = `translateY(${BELOW})`;
  }, []);

  useEffect(() => {
    if (!startCovered) return;
    busy.current = true;
    reveal(0.35).then(() => {
      busy.current = false;
    });
  }, [startCovered, reveal]);

  const go = useCallback(
    async (to: SitePath) => {
      if (busy.current) return;
      if (to === router.state.location.pathname) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = curtain.current;
      const t = text.current;
      if (!el || !t || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        firstVisit.current = false;
        await router.navigate({ to });
        return;
      }
      busy.current = true;
      firstVisit.current = false;
      setLabel(pageLabel(to));
      await Promise.all([
        animate(el, { y: [BELOW, COVER] }, { duration: 0.75, ease: easeInOut }),
        animate(t, { opacity: [0, 1] }, { duration: 0.4, delay: 0.35 }),
      ]);
      await router.navigate({ to });
      window.scrollTo(0, 0);
      await reveal(0.25);
      busy.current = false;
    },
    [router, reveal],
  );

  return (
    <TransitionContext.Provider value={{ go }}>
      {children}
      <div
        ref={curtain}
        aria-hidden
        style={{ transform: `translateY(${startCovered ? COVER : BELOW})` }}
        className="pointer-events-none fixed left-0 top-0 z-[90] flex h-[124vh] w-full flex-col overflow-hidden"
      >
        <div className="relative h-[12vh] shrink-0 overflow-hidden">
          <div className="absolute -left-[10%] top-0 h-[200%] w-[120%] rounded-[50%] bg-ink" />
        </div>
        <div className="flex h-[100vh] shrink-0 items-center justify-center bg-ink text-ink-foreground">
          <p
            ref={text}
            style={{ opacity: startCovered ? 1 : 0 }}
            className="flex items-center text-4xl md:text-6xl"
          >
            <span className="mr-4 inline-block h-3 w-3 rounded-full bg-ink-foreground" />
            {label}
          </p>
        </div>
        <div className="relative h-[12vh] shrink-0 overflow-hidden">
          <div className="absolute -left-[10%] bottom-0 h-[200%] w-[120%] rounded-[50%] bg-ink" />
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

/** Router link that plays the curtain transition before changing page. */
export function TransitionLink({
  to,
  className,
  children,
  onClick,
  "aria-label": ariaLabel,
}: {
  to: SitePath;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
}) {
  const ctx = useContext(TransitionContext);
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    if (!ctx || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    ctx.go(to);
  };
  return (
    <Link to={to} activeOptions={{ exact: true }} onClick={handle} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
