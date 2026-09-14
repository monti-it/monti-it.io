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

## Azure DevOps CI

This repo includes `azure-pipelines.yml` to build the Vite + React app and optionally build/push a Docker image.

### What it does

- Uses Node `20.x`
- Runs `npm ci`, `npm run lint`, and `npm run build`
- Publishes the `dist` folder as a build artifact
- Optionally builds and pushes the Docker image

### Variables

- `DOCKER_BUILD`: set to `true` (default) to build the image
- `DOCKER_PUSH`: set to `true` to push the image
- `IMAGE_NAME`, `IMAGE_TAG`: control the image tagging
- `ACR_LOGIN_SERVER`, `ACR_REPOSITORY`: target Azure Container Registry values

### Registry setup

Create a Docker registry service connection in Azure DevOps named `dockerRegistryServiceConnection` that points to your Azure Container Registry.

### Triggers

Pipeline triggers on `main`, `develop`, and `feature/*` branches by default.
