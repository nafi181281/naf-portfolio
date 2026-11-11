<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- Page copy and project data live in `src/content/portfolio.ts`; sections read from it so text edits never touch layout code.
- Motion uses framer-motion, with reusable effects (preloader, magnetic, fill buttons, reveals, marquee, menu) in `src/components/site/`; keeps animation logic out of the route file.
- Smooth scroll uses Lenis, imported dynamically after the preloader finishes, because it is browser-only and must not scroll while the preloader locks the page.
- Each nav section is its own route (`/work`, `/about`, `/experience`, `/contact`); shared sections live in `src/components/site/Sections.tsx` so the home page and inner pages render the same blocks.
- Internal page links use `TransitionLink` from `src/components/site/PageTransition.tsx`, which plays the curtain animation before navigating; plain `<Link>` would skip it.
