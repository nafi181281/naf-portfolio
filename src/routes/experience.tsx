import { createFileRoute } from "@tanstack/react-router";
import { pages } from "@/content/portfolio";
import { PageHeading } from "@/components/site/PageHeading";
import { PageShell } from "@/components/site/PageShell";
import { CurveIntoFooter, Experience, Footer } from "@/components/site/Sections";
import { SiteHeader } from "@/components/site/SiteHeader";

const page = pages.experience;
const url = "https://dennis-snellenberg-portfolio.lovable.app/experience";

export const Route = createFileRoute("/experience")({
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
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <PageShell>
      <SiteHeader />
      <PageHeading>{page.heading}</PageHeading>
      <Experience />
      <CurveIntoFooter />
      <Footer />
    </PageShell>
  );
}
