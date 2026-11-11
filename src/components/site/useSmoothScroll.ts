import { useEffect } from "react";

/** Lenis smooth scroll, loaded only in the browser once `enabled` is true. */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lenis: { destroy: () => void } | undefined;
    let cancelled = false;
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.09 });
    });
    return () => {
      cancelled = true;
      lenis?.destroy();
    };
  }, [enabled]);
}
