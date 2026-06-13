### Discord Bot Landing Page

A beautiful, animated landing page for the **AvalonX** Discord bot, built with Next.js 15, React 19, and TypeScript.

## Tech Stack

- **Framework:** Next.js 15 (Pages Router)
- **Language:** TypeScript
- **Styling:** CSS Variables + Inline Styles + Keyframe Animations
- **Animations:** IntersectionObserver, Canvas Particles, CSS keyframes

## Project Structure

```
├── pages/
│   ├── index.tsx       # Main landing page
│   ├── 404.tsx         # Custom 404 with glitch animation
│   ├── _app.tsx        # App wrapper
│   └── _document.tsx   # Custom <head> with favicon
├── components/
│   ├── Navbar.tsx      # Responsive nav + hamburger menu
│   └── Particles.tsx   # Canvas particle background
├── hooks/
│   └── useInView.ts    # Scroll animation + counter hooks
├── public/
│   └── logo.jpg        # AvalonX bot avatar
└── styles/
    └── globals.css     # CSS variables + keyframes
```

## Deploy Everywhere

### Vercel (recommended)
```bash
npx vercel --prod
```
Or connect the GitHub repo at vercel.com — zero config needed.

### Netlify
```bash
npm run build
# Upload .next folder, or connect repo at netlify.com
# netlify.toml is already configured
```

### Railway
```bash
# Connect repo at railway.app — railway.json is configured
```

### Render
- Build Command: `npm run build`
- Start Command: `npm run start`
- Environment: Node

### VPS / Docker
```bash
npm install
npm run build
PORT=3000 npm run start
```

## Environment Variables

No required variables — the app works out of the box.

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
