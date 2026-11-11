import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef } from "react";
import { wrap } from "./motion";

/** Endless name ticker; scrolling speeds it up and flips its direction. */
export function NameMarquee({ text, baseVelocity = -2 }: { text: string; baseVelocity?: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    moveBy += direction.current * moveBy * f;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden">
      <motion.div style={{ x }} className="flex w-max whitespace-nowrap">
        {[0, 1].map((i) => (
          <span
            key={i}
            aria-hidden={i === 1}
            className="pr-16 text-[28vw] font-medium leading-none tracking-tight md:text-[13vw]"
          >
            {text} —
          </span>
        ))}
      </motion.div>
    </div>
  );
}
