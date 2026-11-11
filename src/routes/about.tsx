import { createFileRoute } from "@tanstack/react-router";
import { pages } from "@/content/portfolio";
import { Globe } from "@/components/site/Globe";
import { Reveal } from "@/components/site/Reveal";
import { PageHeading } from "@/components/site/PageHeading";
import { PageShell } from "@/components/site/PageShell";
import { About, CurveIntoFooter, Footer } from "@/components/site/Sections";
import { SiteHeader } from "@/components/site/SiteHeader";

const page = pages.about;
const url = "https://dennis-snellenberg-portfolio.lovable.app/about";

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <SiteHeader />
      <PageHeading>{page.heading}</PageHeading>
      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="border-t border-border" />
        <Reveal delay={0.6} className="absolute right-[12%] top-0 -translate-y-1/2">
          <span className="grid h-32 w-32 place-items-center rounded-full bg-ink text-ink-foreground md:h-44 md:w-44">
            <Globe className="h-12 w-12 md:h-16 md:w-16" />
          </span>
        </Reveal>
      </div>
      <div className="mt-24 md:mt-28">
        <About />
      </div>
      <CurveIntoFooter />
      <Footer />
    </PageShell>
  );
}
