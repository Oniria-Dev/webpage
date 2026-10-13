# Next.js template

This is a Next.js template with shadcn/ui.

# Important Documentation
For UI components:
https://ui.shadcn.com/

For Animations:
https://motion.dev/docs

For Multilanguage Support:
https://next-intl.dev/

# Development

Requires Node 22 (`nvm use` picks it up from `.nvmrc`) and pnpm, which comes from the
`packageManager` field in `package.json` — run `corepack enable` once if `pnpm` is missing.

```bash
pnpm install
pnpm dev
```

Before pushing, run what CI runs:

```bash
pnpm lint && pnpm typecheck && pnpm build
```

# Deployment

Production is **Vercel**, deployed automatically from `main` by Vercel's GitHub integration.
DNS lives at Cloudflare in DNS-only mode (grey cloud) — Cloudflare does not proxy this site, so
caching and TLS are Vercel's.

| Trigger | Result |
| --- | --- |
| Open a PR against `main` | `CI / Quality Checks` runs lint + typecheck + build, and Vercel posts a preview URL on the PR |
| Merge to `main` | Vercel deploys to production at `www.oniriasolutions.com` |

`CI / Quality Checks` is a required check, so a red build blocks the merge. Push straight to `main`
and you bypass it — use a PR.

**Environment variables:** none. The site is static content; the contact form and its n8n webhook were removed in the 2026 redesign.

**Rollback:** Vercel dashboard → Deployments → pick the last good one → Instant Rollback. No git
revert needed.

**Self-hosting escape hatch:** `Dockerfile`, `docker-compose.yml` and the
`Deploy to self-hosted VPS (manual)` workflow run this app behind a Cloudflare Tunnel on a VPS.
That workflow is `workflow_dispatch`-only and is **not** part of normal deploys; it needs the
`DEPLOY_*` secrets and a `.env` on the server holding `CLOUDFLARE_TUNNEL_TOKEN`.
