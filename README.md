# Odinaka Esther — Portfolio

A cinematic, interactive developer portfolio built with **SvelteKit**, **TailwindCSS**, and powered by an **AI assistant** (Claude).

## 🚀 Setup

```bash
npm install
npm run dev        # development server (localhost:5173)
npm run build      # production build
npm run preview    # preview production build
```

### Environment Variables

Create a `.env` file in the root:

```
ANTHROPIC_API_KEY=your_key_here
```

The AI chat endpoint (`/api/chat`) uses this key. Without it, the chatbot will show an error state.

## 🏗️ Architecture

```
src/
├── routes/
│   ├── +layout.svelte     # Root layout (Nav, Cursor, Footer, AIChat)
│   ├── +page.svelte       # Home page — composes all sections
│   └── api/
│       ├── chat/          # AI assistant endpoint (Claude claude-haiku-4-5-20251001)
│       └── contact/       # Contact form submission endpoint
└── lib/
    ├── data.js            # Projects, skills, marquee data
    └── components/
        ├── Nav.svelte     # Sticky nav with scroll detection
        ├── Hero.svelte    # Particle canvas + typewriter hero
        ├── Marquee.svelte # Tech stack ticker
        ├── Projects.svelte # Filterable project grid + modal
        ├── About.svelte   # About section with facts grid
        ├── Skills.svelte  # Animated skill bars
        ├── Contact.svelte # Contact form
        ├── AIChat.svelte  # Floating AI chat widget
        ├── Cursor.svelte  # Custom cursor (desktop only)
        └── Footer.svelte
```

**State management**: Svelte's built-in reactivity (`$:`, `bind:`). No external store needed at this scale.

**Routing**: SvelteKit file-based routing. Single-page with hash anchor links for section navigation.

## ✨ Animation Decisions

| Effect | Approach | Reason |
|---|---|---|
| Hero particle field | Canvas API, `requestAnimationFrame` | Lightweight, no library overhead |
| Typewriter effect | Svelte reactive state + `setTimeout` | Pure Svelte, no deps |
| Section reveals | IntersectionObserver + CSS transitions | Native, performant, respects `prefers-reduced-motion` |
| Skill bars | CSS transition on width | Smooth, GPU-composited |
| Marquee | CSS `@keyframes` animation | Zero JS, smooth |
| Custom cursor | `mousemove` + fixed elements | Enhances premium feel on desktop |
| Project cards | CSS `hover:` transitions | Instant, no layout shift |
| AI chat panel | Svelte conditional + CSS class transitions | Smooth open/close |

## ⚡ Performance Optimization

- **Fonts**: Preconnect + `display=swap` for Google Fonts
- **Canvas**: Particle count scales with viewport (`Math.floor(w*h/12000)`) — fewer on small screens
- **IntersectionObserver**: Sections animate only when visible, never wastefully
- **Cursor**: Disabled on touch/pointer:coarse devices (mobile) to avoid unnecessary listeners
- **API**: Claude Haiku for chat (fastest, cheapest model)
- **No heavy animation libraries**: GSAP, Framer Motion, etc. not used — all animations via CSS + canvas

## ♿ Accessibility

- Skip navigation link (`#main`)
- All interactive elements have `aria-label`
- Project cards are `role="button"` with `tabindex="0"` and keyboard handlers
- Chat widget has `role="log"`, `aria-live="polite"`, `aria-expanded`
- Filter tabs use `role="tab"` and `aria-selected`
- Skill bars use `role="meter"` with `aria-valuenow/min/max`
- Semantic HTML throughout (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Visible focus states on all interactive elements
- Cursor disabled on mobile (touch devices)

## 🔄 Trade-offs

| Decision | Trade-off |
|---|---|
| No Svelte stores | Simpler for a portfolio; would need stores if state was shared across many components |
| Canvas particles (not Three.js) | Much smaller bundle; Three.js would enable richer 3D but adds ~600KB |
| Haiku for chat | Faster + cheaper than Sonnet; slightly less nuanced but perfect for FAQ-style queries |
| No SSG/prerender | Keeps API routes working easily; could add `prerender = true` to the page route for static hosting |
| Tailwind utility classes | More verbose HTML but eliminates CSS specificity issues and unused styles are purged |

## 🚢 Deployment

Deploy to **Vercel** (recommended for SvelteKit):

```bash
npm i -g vercel
vercel
```

Set `ANTHROPIC_API_KEY` in your Vercel environment variables dashboard.

Or use **Netlify** with `@sveltejs/adapter-netlify`.
