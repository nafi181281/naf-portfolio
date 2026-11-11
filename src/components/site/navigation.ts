export type SitePath = "/" | "/work" | "/about" | "/experience" | "/contact";

export const pageLabels: Record<SitePath, string> = {
  "/": "Home",
  "/work": "Work",
  "/about": "About",
  "/experience": "Experience",
  "/contact": "Contact",
};

export const pageLabel = (path: string) => pageLabels[path as SitePath] ?? "Nafi Ul Sheak";

/** True until the first page has hydrated; the "Hello" preloader only plays on that first visit. */
export const firstVisit = { current: true };
