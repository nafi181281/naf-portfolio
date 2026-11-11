import { createFileRoute } from "@tanstack/react-router";
import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import studioPortrait from "@/assets/studio-portrait.jpg.asset.json";
import { profile } from "@/content/portfolio";
import { FillButton } from "@/components/site/FillButton";
import { FloatingMenu } from "@/components/site/FloatingMenu";
import { Globe } from "@/components/site/Globe";
import { NameMarquee } from "@/components/site/NameMarquee";
import { Preloader } from "@/components/site/Preloader";
import { Reveal, WordReveal } from "@/components/site/Reveal";
import { About, CurveIntoFooter, Experience, Footer, Work } from "@/components/site/Sections";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SlidingTiles } from "@/components/site/SlidingTiles";
import { easeOut } from "@/components/site/motion";
import { useSmoothScroll } from "@/components/site/useSmoothScroll";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nafi Ul Sheak — Frontend & Web Application Engineer" },
      {
        name: "description",
        content:
          "Nafi Ul Sheak builds high-performance web applications and fluid interfaces with Next.js, TypeScript and Prisma. Based in Bogura, Bangladesh.",
      },
      { property: "og:title", content: "Nafi Ul Sheak — Frontend & Web Application Engineer" },
      { property: "og:description", content: profile.valueProp },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);
  const done = useCallback(() => setLoaded(true), []);
  useSmoothScroll(loaded);

  return (
    <MotionConfig reducedMotion="user">
      <Preloader onDone={done} />
      <FloatingMenu />
      <main id="top" className="bg-background text-foreground">
        <Hero loaded={loaded} />
        <Intro />
        <Work />
        <SlidingTiles />
        <About />
        <Experience />
        <CurveIntoFooter />
        <Footer />
      </main>
    </MotionConfig>
  );
}

function Hero({ loaded }: { loaded: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 60 },
    animate: loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 },
    transition: { duration: 1.1, ease: easeOut, delay },
  });

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-hero text-ink-foreground">
      <motion.img
        style={{ y: imgY }}
        src={studioPortrait.url}
        alt="Studio portrait of Nafi Ul Sheak in a striped shirt and sunglasses"
        className="absolute inset-0 h-full w-full object-cover object-[45%_26%] md:object-[50%_26%] grayscale-[35%]"
      />
      <div className="absolute inset-0 bg-ink/45" />

      <motion.div {...enter(0.3)} className="relative z-10">
        <SiteHeader />
      </motion.div>

      <motion.div style={{ y: contentY }} className="absolute inset-0 top-24 z-10">
        {/* Status badge */}
        <motion.div {...enter(0.45)} className="px-6 md:px-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-ink/60 px-4 py-2 text-xs backdrop-blur md:text-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
            </span>
           
          </span>
        </motion.div>

        {/* Location pill */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={loaded ? { x: 0 } : { x: "-100%" }}
          transition={{ duration: 1.2, ease: easeOut, delay: 0.5 }}
          className="absolute left-0 top-[34%] hidden items-center gap-8 rounded-r-full bg-ink py-4 pl-8 pr-4 md:flex"
        >
          <p className="text-sm leading-snug">
            Based in
            <br />
            Bogura, Bangladesh
            <br />
            <span className="text-ink-foreground/60">{profile.timezone}</span>
          </p>
          <span className="grid h-16 w-16 place-items-center rounded-full bg-hero">
            <Globe className="h-9 w-9" />
          </span>
        </motion.div>

        {/* Role */}
        <motion.div
          {...enter(0.6)}
          className="absolute right-6 top-[54%] max-w-[16rem] text-right md:right-12 md:top-[24%] md:max-w-md md:text-left"
        >
          <ArrowDownRight className="mb-8 ml-auto h-7 w-7 md:ml-0" strokeWidth={1.4} />
          <p className="text-2xl leading-tight md:text-4xl xl:text-5xl">
            Software Engineer
            <br />
            & AI/ML Researcher
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-foreground/80 md:text-base">
            Full-Stack Web Developer 
          </p>
          <p className="mt-2 text-xs text-ink-foreground/70 md:hidden">
            {profile.location} · {profile.timezone}
          </p>
        </motion.div>
      </motion.div>

      {/* Marquee name */}
      <motion.div {...enter(0.35)} className="absolute bottom-6 left-0 z-10 w-full md:bottom-10">
        <NameMarquee text={profile.name} />
      </motion.div>
    </section>
  );
}

function Intro() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-28 md:grid-cols-[2fr_1fr] md:px-12 md:py-40">
      <WordReveal text={profile.valueProp} className="text-3xl leading-snug md:text-[2.6rem] md:leading-[1.3]" />
      <div className="flex flex-col justify-between gap-12">
        <Reveal delay={0.3}>
          <p className="text-muted-foreground">
            Performance-first architecture, clean code and interfaces that feel effortless — from web
            platforms to 3D visualizers and native desktop software.
          </p>
        </Reveal>
        <Reveal delay={0.45}>
          <FillButton
            href="#about"
            className="h-40 w-40 rounded-full bg-ink text-ink-foreground md:h-48 md:w-48"
          >
            About me
          </FillButton>
        </Reveal>
      </div>
    </section>
  );
}
