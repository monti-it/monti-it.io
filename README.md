# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

## Development

To run the project in development mode:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   Open your browser and navigate to the URL displayed in the terminal (typically `http://localhost:5173`)

The development server includes hot module replacement (HMR), so changes to your code will be reflected immediately in the browser.

### Other useful commands:
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## GitHub Actions CI/CD

This repo includes `.github/workflows/deploy.yml` to build the Vite + React app and deploy it to the OVH server that serves monti-it.io. Source hosting and CI/CD were migrated from Azure DevOps in September 2026; the old `azure-pipeline.yaml`/`copy-files-to-ovh.yaml` are kept in the repo purely as reference.

### What it does
- **`build` job** (runs on every push and PR against `main`): Node `20`, `npm ci`, `npm run lint`, `npm run build`, uploads `dist/` as a workflow artifact.
- **`deploy` job** (runs only on a push to `main`, never on PRs): downloads the `dist` artifact and uploads it over SFTP to the OVH server's `www/monti-it.io` folder, using [`wlixcc/SFTP-Deploy-Action`](https://github.com/wlixcc/SFTP-Deploy-Action) pinned to an exact commit SHA, with `sftp_only: true`. The OVH hosting account is SFTP-only (no shell/SSH exec access), so this uses the SFTP file-transfer protocol directly rather than rsync-over-SSH — the same account FileZilla already uses to manage the served files.

### Required repository secrets
Set these under **Settings → Secrets and variables → Actions** (or `gh secret set <NAME>`):
- `OVH_SFTP_HOST` — the OVH server's hostname or IP
- `OVH_SFTP_USER` — the SFTP account username
- `OVH_SFTP_PASSWORD` — the SFTP account password (same credentials used in FileZilla; never committed, add via secret only)
- `OVH_SFTP_PORT` — optional, defaults to `22` if unset

### Triggers
`build` runs on every push and pull request targeting `main`. `deploy` only runs on a direct push to `main` (i.e. after a PR merges), so PR builds never touch the production server.
