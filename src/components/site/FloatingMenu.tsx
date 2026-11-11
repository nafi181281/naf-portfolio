import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { socials } from "@/content/portfolio";
import { Magnetic } from "./Magnetic";
import { easeInOut } from "./motion";
import { pageLabels, type SitePath } from "./navigation";
import { TransitionLink } from "./PageTransition";

const links = (Object.keys(pageLabels) as SitePath[]).map((to) => ({ to, label: pageLabels[to] }));

/** Round menu button that pops in after scrolling and opens a curved side panel. */
export function FloatingMenu() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [h, setH] = useState(0);

  useMotionValueEvent(scrollY, "change", (v) => setVisible(v > 160));
  useEffect(() => {
    const set = () => setH(window.innerHeight);
    set();
    window.addEventListener("resize", set);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("resize", set);
      window.removeEventListener("keydown", esc);
    };
  }, []);

  const initialPath = `M100 0 L100 ${h} Q-100 ${h / 2} 100 0`;
  const targetPath = `M100 0 L100 ${h} Q100 ${h / 2} 100 0`;
  const show = visible || open;

  return (
    <>
      <motion.div
        initial={false}
        animate={{ scale: show ? 1 : 0 }}
        transition={{ duration: 0.35, ease: easeInOut }}
        className="fixed right-5 top-5 z-[70] md:right-10 md:top-8"
      >
        <Magnetic strength={0.3}>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className={cn(
              "grid h-16 w-16 place-items-center rounded-full text-ink-foreground shadow-lg ring-1 ring-ink-foreground/15 transition-colors duration-300 md:h-20 md:w-20",
              open ? "bg-brand" : "bg-ink hover:bg-brand",
            )}
          >
            <span className="relative block h-3 w-6">
              <span
                className={cn(
                  "absolute left-0 h-px w-full bg-current transition-transform duration-300",
                  open ? "top-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-full bg-current transition-transform duration-300",
                  open ? "top-1/2 -rotate-45" : "top-full",
                )}
              />
            </span>
          </button>
        </Magnetic>
      </motion.div>

      <AnimatePresence mode="wait">
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[55] bg-ink/40"
            />
            <motion.nav
              key="panel"
              initial={{ x: "calc(100% + 100px)" }}
              animate={{ x: "0%" }}
              exit={{ x: "calc(100% + 100px)" }}
              transition={{ duration: 0.8, ease: easeInOut }}
              className="fixed right-0 top-0 z-[60] flex h-[100svh] w-full flex-col justify-between bg-ink px-10 pb-12 pt-32 text-ink-foreground sm:w-[480px] md:px-20"
            >
              <div>
                <p className="border-b border-ink-foreground/20 pb-6 text-xs uppercase tracking-widest text-ink-foreground/50">
                  Navigation
                </p>
                <ul className="mt-10 space-y-2">
                  {links.map((l, i) => (
                    <motion.li
                      key={l.to}
                      initial={{ x: 80 }}
                      animate={{ x: 0, transition: { duration: 0.8, ease: easeInOut, delay: 0.05 * i } }}
                      exit={{ x: 80, transition: { duration: 0.8, ease: easeInOut, delay: 0.05 * i } }}
                    >
                      <TransitionLink
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className="group relative inline-block text-5xl font-light md:text-6xl"
                      >
                        <span className="absolute -left-7 top-1/2 h-2.5 w-2.5 -translate-y-1/2 scale-0 rounded-full bg-ink-foreground transition-transform duration-300 group-hover:scale-100 group-data-[status=active]:scale-100" />
                        {l.label}
                      </TransitionLink>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-4 text-xs uppercase tracking-widest text-ink-foreground/50">Socials</p>
                <div className="flex flex-wrap gap-6 text-sm">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
              {h > 0 && (
                <svg className="pointer-events-none absolute -left-[99px] top-0 h-full w-[100px] fill-ink">
                  <motion.path
                    initial={{ d: initialPath }}
                    animate={{ d: targetPath, transition: { duration: 1, ease: easeInOut } }}
                    exit={{ d: initialPath, transition: { duration: 0.8, ease: easeInOut } }}
                  />
                </svg>
              )}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
