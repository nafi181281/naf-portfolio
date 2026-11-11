import { motion, useScroll, useTransform } from "framer-motion";
import { Trophy } from "lucide-react";
import { useRef } from "react";
import portrait from "@/assets/nafiul-portrait.jpg.asset.json";
import { achievements, bio, experience, profile, projects, services, socials, stack, testimonial } from "@/content/portfolio";
import { FillButton } from "./FillButton";
import { LocalTime } from "./LocalTime";
import { Magnetic } from "./Magnetic";
import { ProjectList } from "./ProjectList";
import { Reveal } from "./Reveal";

export const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
    </svg>
  );
}

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 pb-16 md:px-12">
      <Reveal>
        <p className="mb-10 text-xs uppercase tracking-widest text-muted-foreground">Selected work</p>
      </Reveal>
      <ProjectList projects={projects} />
      <Reveal className="mt-16 flex justify-center">
        <FillButton
          href="https://github.com/nafi181281"
          {...ext}
          className="rounded-full border border-border px-12 py-6 hover:border-brand hover:text-brand-foreground"
        >
          More on GitHub
        </FillButton>
      </Reveal>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-28 md:grid-cols-[1fr_2fr] md:px-12 md:py-36">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">About</p>
          <div className="mt-8 aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl">
            <img
              src={portrait.url}
              alt="Portrait of Nafi Ul Sheak"
              className="h-full w-full object-cover object-[center_80%] transition-transform duration-700 hover:scale-105"
            />
          </div>
        </Reveal>
        <div className="space-y-6 text-lg leading-relaxed md:text-xl">
          {bio.map((para, i) => (
            <Reveal key={para.slice(0, 20)} delay={0.1 * i}>
              <p>{para}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-28 md:grid-cols-3 md:px-12">
        {services.map((s, i) => (
          <Reveal key={s.n} delay={0.12 * i} className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground">{s.n}</p>
            <h3 className="mt-6 text-3xl font-medium">{s.title}</h3>
            <p className="mt-4 text-muted-foreground">{s.text}</p>
          </Reveal>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-28 md:px-12 md:pb-36">
        <Reveal>
          <p className="mb-10 text-xs uppercase tracking-widest text-muted-foreground">Tech stack & tools</p>
        </Reveal>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((g, i) => (
            <Reveal key={g.group} delay={0.1 * i}>
              <h4 className="font-medium">{g.group}</h4>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
      <Reveal>
        <p className="mb-10 text-xs uppercase tracking-widest text-muted-foreground">Experience</p>
      </Reveal>
      <ul className="border-t border-border">
        {experience.map((e) => (
          <li key={e.role} className="border-b border-border">
            <Reveal y={30} className="grid gap-3 py-10 md:grid-cols-[1.2fr_2fr_9rem] md:gap-12">
              <p className="text-sm text-muted-foreground md:order-3 md:text-right">{e.period}</p>
              <div>
                <h3 className="text-2xl font-medium md:text-3xl">{e.role}</h3>
                <p className="mt-1 text-muted-foreground">{e.org}</p>
              </div>
              <p className="text-muted-foreground md:order-2">{e.text}</p>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal className="relative z-20">
        <div className="mb-10 mt-24 flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-brand-foreground">
            <Trophy className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="text-3xl font-medium md:text-4xl">Achievements</h3>
        </div>
      </Reveal>
      <div className="relative z-20 grid gap-6 md:grid-cols-2 md:gap-8">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={0.12 * i}>
            <article className="h-full rounded-3xl border border-brand/20 bg-brand/5 p-7 transition duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10 md:p-10">
              <div className="mb-8 flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground">
                  <Trophy className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-5xl font-medium text-brand/25">0{i + 1}</span>
              </div>
              <h4 className="text-2xl font-medium md:text-3xl">{a.title}</h4>
              <p className="mt-4 text-base leading-relaxed text-foreground/75 md:text-lg">{a.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="relative z-20 mt-24">
        <figure className="rounded-3xl bg-ink-black px-8 py-14 text-ink-foreground md:px-16 md:py-20">
          <blockquote className="text-2xl leading-snug md:text-4xl md:leading-snug">“{testimonial.quote}”</blockquote>
          <figcaption className="mt-8 text-sm text-ink-foreground/60">— {testimonial.source}</figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

/** White page edge that bulges down over the dark footer and flattens as you scroll. */
export function CurveIntoFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const height = useTransform(scrollYProgress, [0, 0.9], [60, 0]);
  return (
    <motion.div ref={ref} style={{ height }} className="relative z-10 bg-ink">
      <div className="absolute -left-[10%] bottom-0 h-[1550%] w-[120%] rounded-b-[50%] bg-background shadow-[0_60px_50px_color-mix(in_oklab,var(--ink)_40%,transparent)]" />
    </motion.div>
  );
}

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [-110, 0]);
  const btnX = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  return (
    <footer id="contact" ref={ref} className="overflow-hidden bg-ink text-ink-foreground">
      <motion.div style={{ y }} className="mx-auto max-w-7xl px-6 pt-8 md:px-12 md:pt-12">
        <p className="mb-5 text-ink-foreground/60">Have a project in mind?</p>
        <div className="flex items-center gap-6">
          <img
            src={portrait.url}
            alt=""
            className="h-14 w-14 shrink-0 rounded-full object-cover object-[center_55%] md:h-16 md:w-16 lg:h-20 lg:w-20"
          />
          <h2 className="text-3xl font-medium leading-tight md:text-5xl lg:text-7xl">Let’s build</h2>
        </div>
        <div className="flex items-start justify-between gap-6">
          <h2 className="text-3xl font-medium leading-tight md:text-5xl lg:text-7xl">something exceptional together</h2>
          <motion.svg
            style={{ rotate }}
            viewBox="0 0 9 9"
            fill="none"
            className="mt-6 hidden h-5 w-5 shrink-0 md:block"
            aria-hidden
          >
            <path d="M8 8.5V1M8 1H0.5M8 1L0.5 8.5" stroke="currentColor" />
          </motion.svg>
        </div>

        <div className="relative mt-16 border-t border-ink-foreground/20">
          <motion.div style={{ x: btnX }} className="absolute right-[26%] -top-14 md:right-[18%]">
            <FillButton
              href={`mailto:${profile.email}`}
              fillClassName="bg-tile-4"
              className="h-28 w-28 rounded-full bg-brand text-center text-brand-foreground md:h-32 md:w-32"
            >
              Get in touch
            </FillButton>
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-3 pb-5 pt-16 md:pt-20">
          <FillButton
            href={`mailto:${profile.email}`}
            className="break-all rounded-full border border-ink-foreground/30 px-5 py-3 text-sm md:px-8 md:py-5 md:text-base"
          >
            {profile.email}
          </FillButton>
         
          
          <FillButton href={profile.calendar} {...ext} className="rounded-full border border-ink-foreground/30 px-5 py-3 text-sm md:px-8 md:py-5 md:text-base">
            Book a 15–30 min call
          </FillButton>
        </div>
        <p className="max-w-xl pb-4 text-sm text-ink-foreground/60">
          Open for software engineering and frontend collaborations. Schedule a quick technical or project
          discussion call any time.
        </p>

        <FooterBar />
      </motion.div>
    </footer>
  );
}

/** Version, live local time and social links along the bottom edge. */
export function FooterBar() {
  return (
    <div className="flex flex-col gap-6 border-t border-ink-foreground/10 py-5 text-sm md:flex-row md:items-end md:justify-between">
      <div className="flex gap-10">
        <div>
          <p className="mb-3 text-xs uppercase tracking-widest text-ink-foreground/40">Version</p>
          <p>2026 © Edition</p>
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-widest text-ink-foreground/40">Local time</p>
          <p>
            <LocalTime />
          </p>
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs uppercase tracking-widest text-ink-foreground/40">Socials</p>
        <div className="flex flex-wrap gap-2 md:gap-4">
          {socials.map((s) => (
            <Magnetic key={s.label} strength={0.3}>
              <a href={s.href} {...ext} className="link-underline inline-flex items-center gap-2 p-1">
                {s.label === "WhatsApp" && <WhatsAppIcon className="h-4 w-4 text-success" />}
                {s.label}
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
    </div>
  );
}
