import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { buildMailto } from "@/components/site/ContactForm";
import { routeTree } from "@/routeTree.gen";

const router = () => createRouter({ routeTree, context: { queryClient: new QueryClient() } });

describe("separate pages", () => {
  for (const path of ["/work", "/about", "/experience", "/contact"]) {
    it(`${path} opens its own page`, () => {
      expect(router().matchRoutes(path).at(-1)?.routeId).toBe(path);
    });
  }

  it("/ still opens the main page", () => {
    expect(router().matchRoutes("/").at(-1)?.routeId).toBe("/");
  });
});

describe("contact form", () => {
  it("sends the enquiry to Nafi's email", () => {
    const url = buildMailto({ name: "Rahim", email: "r@x.com", organization: "", services: "", message: "Need a site" });
    expect(url.startsWith("mailto:nafiulsheak.pubcse@gmail.com?")).toBe(true);
    expect(decodeURIComponent(url)).toContain("Need a site");
  });
});
