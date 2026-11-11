import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const rowA = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"];
const rowB = ["Three.js", "WebGL", "C / Win32", "Node.js", "Git", "Vercel"];
const tones = [
  "bg-tile-1 text-tile-1-foreground",
  "bg-tile-3 text-tile-3-foreground",
  "bg-tile-2 text-tile-2-foreground",
  "bg-secondary text-secondary-foreground",
  "bg-tile-4 text-tile-4-foreground",
  "bg-ink text-ink-foreground",
];

/** Two rows of tiles that slide in opposite directions while scrolling. */
export function SlidingTiles() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-250, 0]);

  return (
    <div ref={ref} className="flex flex-col gap-[3vw] overflow-hidden py-16">
      {[
        { items: rowA, x: x1, offset: 0 },
        { items: rowB, x: x2, offset: 2 },
      ].map((row, r) => (
        <motion.div key={r} style={{ x: row.x }} className="-ml-[10vw] flex gap-[3vw]">
          {row.items.map((t, i) => (
            <div
              key={t}
              className={cn(
                "grid h-[22vw] w-[34vw] shrink-0 place-items-center rounded-lg text-[3vw] font-medium md:h-[18vw] md:w-[25vw] md:text-[2vw]",
                tones[(i + row.offset) % tones.length],
              )}
            >
              {t}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
