---
name: pickup-ui
description: Pickup-specific conventions layered on top of the shadcn skill. Use whenever building or editing UI in this repo — pages under src/app, components under src/components, anything in src/design-system, Figma Code Connect files, or when running the shadcn CLI.
---

# Pickup UI

Pickup is a shadcn project (`radix-nova` style, Radix base, Tailwind v4, heroicons). Follow the `shadcn` skill for composition, styling, forms, and CLI rules. This skill only covers where Pickup differs.

## Where things live

- `@/design-system` is the only import path for UI in app code. Never import from `@/design-system/components/*` directly outside the design system.
- `src/design-system/components/` — shadcn primitives (the `ui` alias in `components.json`), restyled with Pickup tokens.
- `src/design-system/patterns/` — product patterns with no shadcn equivalent: `PageContainer`, `StickyActionBar`, `SummaryCard`, `PickupLogo`.
- `src/design-system/figma/*.figma.ts` — parserless Code Connect templates; imports resolve to `@pickup/design-system`.
- `src/design-system/playground/showcase.tsx` — rendered at `/design-system`. Update it when adding or restyling a primitive.

## Compose, don't wrap

Compose primitives at the call site (`Avatar` + `AvatarFallback`, `Field` + `FieldLabel`, `InputGroup` + `InputGroupAddon`, `RadioGroup` inside `FieldLabel` choice cards).

Keep a composite component when it owns behavior or maps 1:1 to a Figma component:

- `SearchField` owns the controlled search + clear interaction and composes `InputGroup`.
- `EmptyState` mirrors Figma's Empty component and composes the `Empty*` slots. Use the raw slots when a screen needs custom structure.

Helpers go in `@/lib/utils` (e.g. `initialsFromName`).

## Pickup tokens (keep them when restyling)

- Sizes: `h-control` / `size-control` (48px), `size-control-compact` (32px), `size-icon` (24px). Spacing is on an 8px grid.
- Typography: `type-*` utilities (`type-label-small`, `type-body-large`, …) instead of `text-sm`/`text-base`.
- Inputs: `inputSurfaceVariants` from `input-surface-variants.ts` (`filled` → `bg-card`, `outline` → `border-input`). `InputGroup` takes the same `variant` prop.
- Focus and invalid rings are full strength: `ring-3 ring-ring` / `ring-destructive` — no `/50` opacity.
- Hover fills use `bg-interaction-subtle`; disabled uses `text-muted-foreground` rather than half opacity.
- Icons: `@heroicons/react` only (24/outline by default). Never add lucide. Let primitives size icons (`data-icon`, `[&_svg]:size-icon`).

## Adding shadcn components

1. Preview first: `npx shadcn@latest add <name> --dry-run` (and `--diff <file>` for existing ones).
2. Add the component and decline overwrites for existing files. Never pass `--overwrite` without explicit approval — existing primitives carry Pickup styling.
3. Review every generated import and dependency against `components.json`; the project utility is `cn` from `@/lib/utils`.
4. Restyle with the tokens above, re-export from `src/design-system/index.ts`, and add a showcase example.
5. Run `npm run typecheck` and `npm run lint`.

## Figma

- File: Pickup — Brand (`https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand`). Code Connect URLs use this main file key.
- Name Figma components after the shadcn root (`Empty`, not `Empty state`) and name layers after slots (`EmptyMedia`, `EmptyTitle`, …). Expose content as component properties so templates use `getString` / `getBoolean` / `getInstanceSwap` rather than `findText` on hardcoded layer names.
- Code Connect templates emit the composed primitives exactly as app code would write them.
- Publish with `npm run figma:connect` (requires `FIGMA_ACCESS_TOKEN`).
