import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { easeInOut } from "./motion";
import { firstVisit } from "./navigation";

const words = ["Hello", "হ্যালো", "Bonjour", "Ciao", "Olá", "やあ", "Hallå", "Guten Tag", "Hallo"];

export function Preloader({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  // Only the first page of a visit gets the greeting; later visits to Home skip it.
  const [show, setShow] = useState(() => firstVisit.current);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    firstVisit.current = false;
    if (!show) {
      onDone();
      return;
    }
    setSize({ w: window.innerWidth, h: window.innerHeight });
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!show) return;
    if (index === words.length - 1) {
      const t = setTimeout(() => {
        setShow(false);
        document.documentElement.style.overflow = "";
        onDone();
      }, 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), index === 0 ? 1000 : 150);
    return () => clearTimeout(t);
  }, [index, onDone, show]);

  const { w, h } = size;
  const initialPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 300} 0 ${h} L0 0`;
  const targetPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          exit={{ top: "-100vh", transition: { duration: 0.8, ease: easeInOut, delay: 0.2 } }}
          className="fixed inset-x-0 top-0 z-[100] flex h-screen items-center justify-center bg-ink text-ink-foreground"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85, transition: { duration: 1, delay: 0.2 } }}
            className="relative z-10 flex items-center text-4xl md:text-6xl"
          >
            <span className="mr-4 inline-block h-3 w-3 rounded-full bg-ink-foreground" />
            {words[index]}
          </motion.p>
          {w > 0 && (
            <svg className="pointer-events-none absolute left-0 top-0 h-[calc(100%+300px)] w-full">
              <motion.path
                className="fill-ink"
                initial={{ d: initialPath }}
                exit={{ d: targetPath, transition: { duration: 0.7, ease: easeInOut, delay: 0.3 } }}
              />
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
