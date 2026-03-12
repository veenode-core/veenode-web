# Veenode Technologies Website

Official website for Veenode Technologies - a global professional services firm specializing in AI engineering, cybersecurity, software development, machine learning, and AI governance.

## About Veenode

Veenode Technologies helps ambitious organizations build, secure, and responsibly govern the technology that powers their next stage of growth. With expertise spanning five core disciplines, we deliver senior-led, production-ready solutions to clients across Nigeria, Ghana, the UK, the US, and beyond.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **Animations:** GSAP with ScrollTrigger
- **Icons:** Phosphor Icons
- **Package Manager:** Bun

## Key Features

- 🎨 Custom design system with Poppins (headers) and Manrope (body) fonts
- 🎭 Resource-based preloader with edge case handling
- ✨ GSAP-powered text split reveal animations
- 🖱️ Custom cursor with independent dot and ring tracking
- 📱 Fully responsive mobile-first design
- 🎯 Modular component architecture
- 🚀 Optimized performance with code splitting

## Color Palette

- **Primary Navy Blue:** `#1A3C6E` - Backgrounds, headers, buttons
- **Brand Gold:** `#F0A500` - CTAs, accents, highlights
- **Light Blue Tint:** `#EAF0FA` - Section backgrounds
- **Dark Text:** `#1A1A1A` - Body copy
- **Muted Text:** `#555555` - Secondary text

## Project Structure

```
src/
├── components/
│   ├── home/          # Home page sections
│   ├── ui/            # Reusable UI components
│   ├── navbar.tsx
│   └── preloader.tsx
├── data/              # Static data and content
├── pages/             # Route pages
└── assets/            # Images and static files
```

## Development

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Deployment

Configured for Vercel with SPA routing via `vercel.json`. The preloader only shows on initial page load/refresh, not on client-side navigation.

## License

Proprietary - © 2024 Veenode Technologies. All rights reserved.
