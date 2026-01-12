# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js 15 Pages Router app with a `/mng` base path for routes. Source code lives in `src/` with key areas:
- `src/pages/` for routes (including `src/pages/api/` for API routes).
- `src/components/` for UI by feature; desktop/mobile variants usually follow `ComponentDesktop.jsx` / `ComponentMobile.jsx`.
- `src/redux/` and `src/redux/services/` for Redux Toolkit + RTK Query.
- `src/config/` for API configuration and endpoints.
- `src/styles/`, `public/`, and `src/utils/` for styling, assets, and helpers.
Path aliases use `@/*` → `src/*` (see `jsconfig.json`).

## Build, Test, and Development Commands
- `npm run dev`: start the dev server at `http://localhost:3000/mng`.
- `npm run build`: production build.
- `npm run start`: run the production server after build.
- `npm run lint`: run Next.js ESLint rules.
Docker workflows are available via `docker-compose --profile dev|prod|nginx up --build`.

## Coding Style & Naming Conventions
- JavaScript/JSX with 2‑space indentation; keep files small and focused.
- Use the `@/` alias for internal imports, e.g. `import Layout from "@/components/layout/Layout";`.
- Tailwind CSS is configured; prefer utility classes for layout and typographic styling.
- Follow existing naming patterns for layout splits (Desktop/Mobile components) and route files under `src/pages/`.

## Testing Guidelines
No dedicated test runner is currently configured. For changes, rely on:
- `npm run lint` for static checks.
- Manual verification in the dev server, especially desktop vs mobile layouts and vertical text flow.
If adding tests, align with project conventions and document new scripts in `package.json`.

## Commit & Pull Request Guidelines
Recent history uses short, lowercase messages like `fix`, `fixed`, `bug fixes`. Keep commits concise and scoped.
For PRs, include:
- A brief description of the change and user impact.
- Screenshots or recordings for UI changes (desktop + mobile).
- Notes about config/env updates (see `env.example`).
- Test steps (commands run and manual checks).

## Configuration & Architecture Notes
- Base path is `/mng` (see `next.config.mjs`), so all routes are prefixed.
- Traditional Mongolian text uses vertical writing mode; keep `font-mongolian` and layout conventions intact.
