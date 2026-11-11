import { AnimatePresence, motion, useSpring } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Project } from "@/content/portfolio";
import { easeInOut, easeOut } from "./motion";
import { Reveal } from "./Reveal";

const tiles = [
  "bg-tile-1 text-tile-1-foreground",
  "bg-tile-2 text-tile-2-foreground",
  "bg-tile-3 text-tile-3-foreground",
  "bg-tile-4 text-tile-4-foreground",
];

/** Project rows: hovering shows a floating preview that follows the mouse, clicking opens the details. */
export function ProjectList({ projects }: { projects: Project[] }) {
  const [hover, setHover] = useState<{ active: boolean; index: number }>({ active: false, index: 0 });
  const [open, setOpen] = useState<number | null>(null);

  const cardX = useSpring(0, { stiffness: 150, damping: 20, mass: 0.6 });
  const cardY = useSpring(0, { stiffness: 150, damping: 20, mass: 0.6 });
  const dotX = useSpring(0, { stiffness: 300, damping: 25, mass: 0.4 });
  const dotY = useSpring(0, { stiffness: 300, damping: 25, mass: 0.4 });

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    cardX.set(e.clientX);
    cardY.set(e.clientY);
    dotX.set(e.clientX);
    dotY.set(e.clientY);
  };

  return (
    <div onPointerMove={move}>
      <ul className="border-t border-border">
        {projects.map((p, i) => {
          const isOpen = open === i;
          return (
            <li key={p.name} className="border-b border-border">
              <Reveal delay={0.05 * i} y={30}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "mouse") return;
                    cardX.jump(e.clientX);
                    cardY.jump(e.clientY);
                    setHover({ active: true, index: i });
                  }}
                  onPointerLeave={() => setHover((h) => ({ ...h, active: false }))}
                  className="group flex w-full flex-col items-start gap-3 py-10 text-left md:cursor-none md:flex-row md:items-center md:justify-between md:px-10 md:py-14"
                >
                  <span className="text-4xl font-medium transition-all duration-500 md:text-7xl md:group-hover:-translate-x-3 md:group-hover:opacity-40">
                    {p.name}
                  </span>
                  <span className="flex items-center gap-6 text-muted-foreground transition-all duration-500 md:group-hover:translate-x-3 md:group-hover:opacity-40">
                    <span className="max-w-xs md:text-right">{p.category}</span>
                    <Plus
                      className={cn("h-5 w-5 shrink-0 transition-transform duration-300", isOpen && "rotate-45")}
                    />
                  </span>
                </button>
              </Reveal>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: easeInOut }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 pb-14 md:grid-cols-[1fr_1.4fr] md:px-10">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">0{i + 1}</p>
                        <p className="text-lg">{p.role}</p>
                        <p className="text-sm text-muted-foreground">{p.year}</p>
                      </div>
                      <div className="flex flex-col gap-6">
                        <p className="leading-relaxed text-muted-foreground">{p.summary}</p>
                        <ul className="flex flex-wrap gap-2">
                          {p.stack.map((t) => (
                            <li key={t} className="rounded-full border border-border px-3 py-1 text-sm">
                              {t}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-3">
                          {p.links.map((l) => (
                            <a
                              key={l.href}
                              href={l.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-ink-foreground transition-colors duration-300 hover:bg-brand"
                            >
                              {l.label}
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {/* Floating preview */}
      <motion.div
        style={{ left: cardX, top: cardY }}
        initial={{ scale: 0, x: "-50%", y: "-50%" }}
        animate={{ scale: hover.active ? 1 : 0, x: "-50%", y: "-50%" }}
        transition={{ duration: 0.4, ease: easeOut }}
        className="pointer-events-none fixed z-40 hidden h-[300px] w-[400px] overflow-hidden md:block"
      >
        <div
          className="relative h-full w-full transition-[top] duration-500"
          style={{ top: `${hover.index * -100}%`, transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}
        >
          {projects.map((p, i) => (
            <div key={p.name} className={cn("flex h-full w-full items-center justify-center p-8", tiles[i % tiles.length])}>
              <div className="w-full rounded-xl border border-current/20 bg-background/10 p-6 shadow-2xl backdrop-blur">
                <div className="mb-5 flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-current opacity-40" />
                  <span className="h-2 w-2 rounded-full bg-current opacity-40" />
                  <span className="h-2 w-2 rounded-full bg-current opacity-40" />
                </div>
                <p className="text-3xl font-medium leading-none">{p.name}</p>
                <p className="mt-3 text-sm opacity-75">{p.category}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 3).map((t) => (
                    <span key={t} className="rounded-full border border-current/30 px-2.5 py-0.5 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Cursor label */}
      <motion.div
        style={{ left: dotX, top: dotY }}
        initial={{ scale: 0, x: "-50%", y: "-50%" }}
        animate={{ scale: hover.active ? 1 : 0, x: "-50%", y: "-50%" }}
        transition={{ duration: 0.3, ease: easeOut }}
        className="pointer-events-none fixed z-50 hidden h-20 w-20 place-items-center rounded-full bg-brand text-sm text-brand-foreground md:grid"
      >
        {open === hover.index ? "Close" : "View"}
      </motion.div>
    </div>
  );
}
