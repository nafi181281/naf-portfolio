import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { easeOut } from "./motion";

/** Fades and slides its content up the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 50,
}: {
  children: ReactNode;
  delay?: number;
  className?: string | undefined;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Each word slides up from behind a mask, one after another. */
export function WordReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <h1 ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="relative mr-[0.25em] inline-flex overflow-hidden pb-[0.08em]">
          <motion.span
            initial={{ y: "100%" }}
            animate={inView ? { y: "0%" } : { y: "100%" }}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.02 * i }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
