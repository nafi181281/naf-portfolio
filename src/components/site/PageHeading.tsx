import { Reveal } from "./Reveal";

/** Large opening heading for inner pages; slides up as the page-change curtain lifts. */
export function PageHeading({ children }: { children: string }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 md:px-12 md:pb-28 md:pt-28">
      <Reveal delay={0.45} y={70}>
        <h1 className="max-w-5xl text-5xl font-medium leading-[1.05] md:text-7xl lg:text-8xl">{children}</h1>
      </Reveal>
    </section>
  );
}
