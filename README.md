# Akabir Abbas — Portfolio

A Next.js 16, TypeScript, and Tailwind CSS portfolio built as a public working index of verified projects.

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test:visual
```

Private projects intentionally have no public repository links. Update `src/content/projects.ts` only if you want to disclose more detail or add a private case-study destination.

## Preview the production export

```bash
pnpm build
pnpm preview
```

Open [http://localhost:3000](http://localhost:3000). The project exports a static `out` directory, which is deployed by GitHub Actions to GitHub Pages.

## GitHub Pages

The included workflow, `.github/workflows/deploy-pages.yml`, deploys each push to `main`. In the repository settings, set **Pages → Source** to **GitHub Actions**, then set `akabirabbas.me` as the custom domain. GitHub Actions does not need a `CNAME` file in this repository—the Pages setting is the source of truth.

`Codex-Skills/` is intentionally ignored: it is a local reference collection, not part of the portfolio application or deployment.
