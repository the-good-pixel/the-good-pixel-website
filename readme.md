# GoodPixel.AI Website

Modern static website built with SvelteKit, Tailwind CSS, and neobrutalism design.

## Tech Stack

- **SvelteKit** - Framework for static site generation
- **Tailwind CSS v4** - Utility-first CSS framework
- **TypeScript** - Type-safe development
- **Neobrutalism Design** - Bold, brutal aesthetic with thick borders and offset shadows
- **Firebase Hosting** - Deployment platform

## Setup

### Prerequisites

- Node.js 22+ (use nvm: `nvm install 22 && nvm use 22`)
- npm

### Installation

```bash
nvm use 22
npm install
```

## Development

```bash
npm run dev              # Start dev server at http://localhost:5173
npm run dev -- --open    # Start dev server and open browser
```

## Build & Deploy

```bash
npm run build            # Build for production (outputs to build/)
npm run preview          # Preview production build locally
```

### Deploy to Firebase

```bash
firebase login           # Login with info@goodpixel.ai
firebase deploy --only hosting
```

## Project Structure

```
src/
├── routes/             # SvelteKit file-based routing
│   ├── +page.svelte   # Homepage
│   ├── +layout.svelte # Root layout
│   └── +layout.ts     # Layout config (prerender: true)
├── lib/
│   └── components/    # Reusable Svelte components
└── app.css            # Tailwind + custom styles

static/                 # Static assets
├── assets/img/        # Images
└── favicons/          # Favicon files

build/                  # Production build (generated)
```

## Neobrutalism Design System

The site uses a custom neobrutalism design with:

- **Bold borders**: 4px thick black borders
- **Offset shadows**: 4px, 8px, and 12px variants
- **Vibrant colors**: Yellow, pink, blue, green, and red accents
- **Interactive feedback**: Elements translate on hover/active states

### Custom Colors

- `neo-black`: #000000
- `neo-white`: #FFFFFF
- `neo-yellow`: #FFD700
- `neo-pink`: #FF10F0
- `neo-blue`: #00E0FF
- `neo-green`: #00FF94
- `neo-red`: #FF0051

## Migration Notes

This site was migrated from a pure HTML/Unify template to SvelteKit in November 2024.

Old files are backed up in `.migration-backup/` directory.
