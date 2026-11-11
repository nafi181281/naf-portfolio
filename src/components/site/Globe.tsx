import { useEffect, useRef } from "react";

const MERIDIANS = 4;
const R = 10;

/** Wireframe globe whose meridians turn continuously, like a slowly spinning earth. */
export function Globe({ className }: { className?: string }) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll("ellipse");
    if (!els) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = ((now - start) / 1000) * 0.9;
      els.forEach((el, i) => {
        const rx = Math.abs(Math.sin(t + (i * Math.PI) / MERIDIANS)) * R;
        el.setAttribute("rx", rx.toFixed(2));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={0.9} className={className} aria-hidden>
      <circle cx="12" cy="12" r={R} />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="17" x2="20" y2="17" />
      <g ref={ref}>
        {Array.from({ length: MERIDIANS }).map((_, i) => (
          <ellipse key={i} cx="12" cy="12" rx={R} ry={R} />
        ))}
      </g>
    </svg>
  );
}
