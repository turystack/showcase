# showcase

Documentation site for the Turystack libraries — the reference every package
README links to. Published at **https://tury.dev**.

Each `@turystack/*` package owns its setup and API documentation here; the
skills own decisions and invariants, and never restate what lives on this site.

## Development

```bash
pnpm install
pnpm dev
```

```bash
pnpm typecheck
pnpm check
pnpm build
```

## Structure

| Path | Contents |
|---|---|
| `src/routes/libs/<package>/` | one page per documented surface of a package |
| `src/lib/skill-docs.ts` | reads the skill markdown straight from each skill package |
| `src/components/docs/` | `CodeBlock`, `PropsTable` and the shared documentation primitives |

Skill pages are not written twice: they are rendered from the markdown shipped
by `@turystack/architecture-pattern`, `@turystack/backend-pattern`,
`@turystack/frontend-pattern` and `@turystack/frontend-primitives-pattern`, so
the site cannot drift from the skills themselves.

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every
push to `main`.
