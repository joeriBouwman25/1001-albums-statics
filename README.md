# 1001 Albums Statistics

A full-stack application for tracking and visualizing album statistics.

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Package Manager**: pnpm (monorepo setup)

## Development

### Prerequisites

- Node.js 20+
- pnpm 10.19.0+

### Installation

```bash
pnpm install
```

### Running Locally

Start both client and server in development mode:

```bash
pnpm dev
```

This will start:
- Client on http://localhost:3000
- Server on http://localhost:5000

### Build

Build both client and server:

```bash
pnpm build
```

### Scripts

- `pnpm dev` - Run client and server in development mode
- `pnpm build` - Build both client and server for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm deploy` - Build and prepare client for deployment

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

### Setup Instructions

1. **Enable GitHub Pages in your repository**:
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Build and deployment", set Source to **GitHub Actions**

2. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

3. **Monitor deployment**:
   - Go to the "Actions" tab in your GitHub repository
   - Watch the "Deploy to GitHub Pages" workflow run
   - Once complete, your site will be live at: `https://[username].github.io/1001-albums-statistics/`

### Manual Deployment

You can also build locally and deploy manually:

```bash
pnpm deploy
```

Then push the `client/dist` directory to the `gh-pages` branch (requires additional setup).

### Configuration Notes

- The app is configured with base path `/1001-albums-statistics/` for GitHub Pages
- The `.nojekyll` file is automatically created to ensure proper routing
- GitHub Actions workflow triggers on every push to `main` branch
- You can also manually trigger deployment from the Actions tab

## Project Structure

```
├── client/          # React frontend
│   └── src/
├── server/          # Express backend
│   └── src/
└── .github/
    └── workflows/   # GitHub Actions
```

## Notes

- GitHub Pages only hosts the static frontend (client)
- For full-stack functionality, you'll need to deploy the server separately (e.g., Heroku, Railway, Render)
- Update API endpoints in the client to point to your deployed backend server

