import { useEffect, useState } from "react";

/** Live clock for Bogura (Asia/Dhaka). Rendered after mount to avoid server/browser time mismatch. */
export function LocalTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Dhaka",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return <span>{now ?? "--:--"} GMT+6</span>;
}
