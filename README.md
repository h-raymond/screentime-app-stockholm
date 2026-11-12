# Pickup

A fictional local resale marketplace, demoed in Bengaluru. Buyers can choose delivery at checkout: a neighbor collects the item from the seller and brings it over, rather than having to coordinate with the seller.

**Live demo:** [https://pickup.figma.site](https://pickup.figma.site)

## Background

Pickup was created for **Config India**, in service of a more cohesive launch narrative for code-centric features like Code Layers, Payload, Code Connect, DS Home, and Specs.

Rather than starting with the visual identity and static mocks (as with prior Screentime brands), this project began as a generic frontend codebase, and the brand and content emerged from there. Hopefully, this reflects the nature of many customer products, whose source of truth is the production codebase.

"Local resale with delivery" was chosen for two main reasons:

- Checkout and delivery experiences are regionally topical in India, and underrepresented in Figma's existing demo brands
- Map interactions and live activities are ideal use cases for Code Layers, because they're so difficult to design with static mocks

The demo app uses sample content stored in the repo, and state is persisted via local storage. Many of the items for sale are real belongings from Brand Studio Figmates!

## Quickstart

### Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). 

The map loads OpenFreeMap Positron tiles through MapLibre (network required, no API key).

Useful checks (Playwright scripts need Chromium and a running dev server):

```bash
npm run typecheck
npm run lint
npx playwright install chromium   # once
npm run shots                     # phone + desktop screenshots → .screenshots/
npm run flow                      # buy an item and sample delivery tracking
```

Set `BASE_URL` if the app is not on port 3000, or `SCALE=2` for retina captures.

### Deploy (Figma Cloud)

Two sites so WIP doesn't overwrite the live demo:

| Site | URL | Command |
| --- | --- | --- |
| Staging | [https://pickup-staging.figma.site](https://pickup-staging.figma.site) | `npm run deploy:staging` |
| Production | [https://pickup.figma.site](https://pickup.figma.site) | `npm run deploy` or `npm run deploy:production` |

Once per machine: `npx @payloadcms/figma@alpha login`

Each command builds the Next.js **standalone** bundle and uploads it to the matching Figma Cloud project. Staging reads gitignored `.env.staging-figma`; production prefers `.env.production-figma` and falls back to `.env`. Later deploys overwrite that site only. The CLI cannot rename a subdomain; `--subdomain` is only used when creating a project.

A publish usually takes 2–3 minutes to finish propagating. Do not commit `.env*`.

## Architecture

**Stack:** Next.js 16 App Router, TypeScript, Tailwind v4, shadcn/ui on Radix, Heroicons, Zustand (`persist`), MapLibre GL.

The app is a client-heavy marketplace with a static catalog and a simulated courier. Server rendering still matters for first paint and hydration: anything from `localStorage` waits on `useHydrated()` so the first markup matches.

### Data and state

- `[src/lib/data/items.ts](src/lib/data/items.ts)` — seeded listings (cutout photos, INR prices, real Bengaluru neighbourhoods). Market feed vs. the demo user’s own stall are split here.
- `[src/lib/data/neighborhoods.ts](src/lib/data/neighborhoods.ts)` — named drop-off / listing locations.
- `[src/lib/store.ts](src/lib/store.ts)` — Zustand store persisted under `pickup-bengaluru-v1`: saved IDs, orders, listings, recent searches.
- `[src/lib/types.ts](src/lib/types.ts)` — categories, conditions, item size, fulfillment, delivery stages.
- `[src/lib/geo.ts](src/lib/geo.ts)` — home pin in Indiranagar, haversine distances, delivery fees, `₹` formatting.
- `[src/lib/browse.ts](src/lib/browse.ts)` — category (URL query so list/map stay in sync), search matching.
- `[src/lib/delivery.ts](src/lib/delivery.ts)` — a ~90s animation standing in for a ~38 minute trip. Progress is derived from `placedAt`, so leaving and returning resumes instead of restarting.
- `[src/lib/clock.ts](src/lib/clock.ts)` — shared ticking clock via `useSyncExternalStore`.

Clearing site data resets the demo.

### Routing and chrome

```
src/app/                 App Router pages
  layout.tsx             fonts, AppShell, parallel @sheet slot
  @sheet/                intercepting routes: item, search, categories, you
  page.tsx               list browse
  map/                   map browse (same catalog, different presentation)
  item/[id]/             listing detail
  checkout/[id]/         delivery vs self-pickup
  delivery/[orderId]/    live courier + timeline
  search/, sell/, selling/, saved/, you/, …
  design-system/         in-app visual review of tokens and components
```

`[AppShell](src/components/app-shell.tsx)` wraps browse with a floating header and bottom nav. `[PersistentMapView](src/components/persistent-map-view.tsx)` **stays mounted** across navigation and is only shown on `/map`, so MapLibre does not re-init on every route change.

Search, categories, item detail, and account can open as **sheets** via intercepting routes (`@sheet/(.)…`) and `[RouteSheet](src/components/route-sheet.tsx)`, or as full pages on refresh / direct load. The same page component renders in both presentations.

### Maps

MapLibre touches `window` at import time, so canvases load through `next/dynamic` with `ssr: false` in `[src/components/map/](src/components/map/)`. There are three surfaces: browse stickers, a courier **route** map, and a simple **pin** map on item detail. Style overrides in `style.ts` hide extra labels and tint land/water toward the Pickup palette so photos stay the loudest color. `npm install` copies MapLibre’s worker into `public/maplibre/`.

### UI

- `[src/design-system/](src/design-system/)` — tokens, primitives, and patterns, with a public barrel at `[src/design-system/index.ts](src/design-system/index.ts)`
- Domain components in `[src/components/](src/components/)` compose those primitives (item cards, browse chrome, maps)
- `/design-system` is the in-app review of ramps, semantics, and components

Mobile-first: thumb-height actions, full-bleed maps, bottom sheets. From `md` up, browse chrome becomes a header; at `lg` the map screen splits into a results column beside a persistent map.

### Demo limits

No payments, accounts, or messaging. Listing photos come from a stock library. Couriers are simulated. Item photos are generated stand-ins, not real inventory.

## What’s next

The code already has a visual system (tokens, primitives, `/design-system`). The next step is to **publish a Figma library** from that system and **wire Code Connect** so canvas components stay mapped to these files. A Button mapping lives in `[src/design-system/figma/Button.figma.ts](src/design-system/figma/Button.figma.ts)`; the rest of the library is still to come.