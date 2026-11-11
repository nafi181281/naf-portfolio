import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight } from "lucide-react";
import type { ReactNode } from "react";
import portrait from "@/assets/nafiul-portrait.jpg.asset.json";
import { pages, profile, socials } from "@/content/portfolio";
import { ContactForm } from "@/components/site/ContactForm";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ext, FooterBar, WhatsAppIcon } from "@/components/site/Sections";
import { SiteHeader } from "@/components/site/SiteHeader";

const page = pages.contact;
const url = "https://dennis-snellenberg-portfolio.lovable.app/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: ContactPage,
});

function Detail({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-5 text-xs uppercase tracking-widest text-ink-foreground/50">{title}</p>
      <div className="flex flex-col items-start gap-3">{children}</div>
    </div>
  );
}

function ContactPage() {
  return (
    <PageShell className="bg-ink text-ink-foreground">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:px-12 md:pt-28">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr] md:gap-16">
          <Reveal delay={0.45} y={70}>
            <h1 className="text-5xl font-medium leading-[1.05] md:text-7xl lg:text-8xl">{page.heading}</h1>
          </Reveal>
          <Reveal delay={0.6} className="flex items-center gap-8 md:flex-col md:items-start md:justify-end md:gap-16">
            <img
              src={portrait.url}
              alt="Portrait of Nafi Ul Sheak"
              className="h-20 w-20 rounded-full object-cover object-[center_55%] md:h-24 md:w-24"
            />
            <ArrowDownRight className="h-6 w-6" strokeWidth={1.4} aria-hidden />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-[2fr_1fr]">
          <Reveal delay={0.2}>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.3} className="space-y-12 md:pt-10">
            <Detail title="Contact details">
              <a href={`mailto:${profile.email}`} className="link-underline break-all">
                {profile.email}
              </a>
              
              <a href={profile.whatsappHref} {...ext} className="link-underline inline-flex items-center gap-2">
                <WhatsAppIcon className="h-4 w-4 text-success" />
               
              {profile.whatsapp}
              </a>
            </Detail>
            <Detail title="Details">
              <p>{profile.name}</p>
              <p>Location: {profile.location}</p>
              <p>Timezone: {profile.timezone}</p>
              <a href={profile.calendar} {...ext} className="link-underline">
                Book a 15–30 min call
              </a>
            </Detail>
            <Detail title="Socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} {...ext} className="link-underline">
                  {s.label}
                </a>
              ))}
            </Detail>
          </Reveal>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FooterBar />
      </div>
    </PageShell>
  );
}
