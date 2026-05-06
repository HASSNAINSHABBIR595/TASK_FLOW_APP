# Task Flow App

A modern todo app built with React + Vite + Tailwind.

## Scripts

- `npm run dev` - Start local development server.
- `npm run lint` - Run ESLint checks.
- `npm run test` - Run unit tests once (CI mode).
- `npm run test:watch` - Run tests in watch mode.
- `npm run build` - Create production build in `dist`.
- `npm run preview` - Preview production build locally.

## Environment Variables

Copy `.env.example` to `.env` and adjust values as needed:

- `VITE_ENABLE_SOUNDS=true` - Set to `false` to disable UI sound playback.

## Production Readiness Checklist

- Run `npm ci` for reproducible installs.
- Run `npm run lint && npm run test && npm run build` before deploy.
- Ensure your hosting platform serves the generated `dist` folder.
- Keep `package-lock.json` committed for deterministic CI builds.

## CI

GitHub Actions workflow is available at `.github/workflows/ci.yml` and runs:

1. install (`npm ci`)
2. lint
3. test
4. build

This blocks broken code from being merged/deployed.
