import { createFileRoute } from "@tanstack/react-router";
import { pages } from "@/content/portfolio";
import { PageHeading } from "@/components/site/PageHeading";
import { PageShell } from "@/components/site/PageShell";
import { CurveIntoFooter, Footer, Work } from "@/components/site/Sections";
import { SiteHeader } from "@/components/site/SiteHeader";

const page = pages.work;
const url = "https://dennis-snellenberg-portfolio.lovable.app/work";

export const Route = createFileRoute("/work")({
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
  component: WorkPage,
});

function WorkPage() {
  return (
    <PageShell>
      <SiteHeader />
      <PageHeading>{page.heading}</PageHeading>
      <Work />
      <CurveIntoFooter />
      <Footer />
    </PageShell>
  );
}
