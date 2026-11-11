import { cn } from "@/lib/utils";
import { NavLink } from "./NavLink";
import { TransitionLink } from "./PageTransition";

/** Top bar with the "© Code by Nafi" logo and page links; text colour comes from the page. */
export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn("relative z-10 flex items-center justify-between px-4 py-6 text-sm md:px-10 md:text-base", className)}
    >
      <TransitionLink to="/" className="group flex items-center gap-1 p-2 font-medium">
        <span className="inline-block transition-transform duration-700 group-hover:rotate-[360deg]">©</span>
        <span className="relative grid overflow-hidden">
          <span className="col-start-1 row-start-1 transition-transform duration-500 group-hover:-translate-y-full">
            Code by Nafi
          </span>
          <span className="col-start-1 row-start-1 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
            Nafi Ul Sheak
          </span>
        </span>
      </TransitionLink>
      <nav className="flex gap-1 md:gap-4">
        <NavLink to="/work">Work</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/experience" className="hidden sm:flex">
          Experience
        </NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  );
}
