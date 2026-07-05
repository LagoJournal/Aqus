# Aqus motion audit — v0.4

Requested alongside the Liquid Identity DLC: an analysis of the library's animation
layer with improvement candidates. Findings from a grep-level inventory of
`src/components/**/*.jsx`, `src/tokens/motion.css`, and the new foil layers.

## Inventory

| Animation | Where | Properties | Duration source | Reduced-motion safe? |
|---|---|---|---|---|
| `agus-pulse` | Button (`pulse` prop) | box-shadow | **literal 2s** | ✗ keeps running |
| `agus-breathe` | loading states | opacity, transform | token consumers | ✓ (via tokens) |
| `agus-spin-center` | LiquidBubble spinner | transform | **literal 800ms** | ✗ (but it's a loading indicator — arguably exempt) |
| `agus-shimmer` | Skeleton | background-position | **literal 1.4s** | ✗ keeps running |
| `agus-liquid` | LiquidBubble, HeroSection blobs, foil bubbles | border-radius | `--dur-liquid` (HeroSection fixed in v0.4 → `calc(var(--dur-liquid) * 1.1/0.9)`) | ✓ after v0.4 fix |
| `agus-enter` | menus, dropdowns, dialogs | opacity, transform | `--dur-ui` | ✓ |
| `agus-progress-sweep` | Progress (indeterminate) | left | **literal 1.4s**, inline `<style>` | ✗ (loading indicator) |
| `fx-drift` | foil `.fx-live` | registered custom props `--lx/--ly` | `--fx-dur-light` | ✓ explicit freeze block |
| `fx-pass/fx-sweep/fx-roll/fx-twinkle` | foil shine/chrome/CRT/cosmos | position/opacity | `--fx-dur-shine` etc. | ✓ explicit freeze block |
| punk motions (`foil-float/breathe/drift/wobble/blink/pop/glitch`) | foil objects | translate/scale/rotate/opacity/clip | literal (2.4–14s) | ✓ explicit freeze block |

## Findings

1. **Reduced-motion has a token-shaped hole.** `motion.css` zeroes `--dur-micro/fast/ui/page/liquid`
   under `prefers-reduced-motion`, which silently freezes every token-driven animation — elegant.
   But animations with **literal durations escape it**: Button `agus-pulse 2s`, Skeleton
   `agus-shimmer 1.4s`, Progress sweep, LiquidBubble spinner `800ms`. HeroSection's decorative
   blobs (`11s/9s`) had the same hole — **fixed in v0.4** by deriving from `--dur-liquid`
   (`calc(× 1.1)` / `calc(× 0.9)`) — identical speeds, now freeze correctly.
   Note `--dur-pulse` exists but is *not* zeroed in the reduced block, and Button doesn't use it.
2. **Compositor safety is mostly good.** Menus/dialogs animate opacity+transform (cheap).
   Two paint-property animations run only in bounded contexts: `agus-pulse` (box-shadow,
   opt-in prop) and `agus-shimmer` (background-position, loading only). Acceptable; don't
   add ambient paint animations elsewhere.
3. **Token adoption is strong.** Zero literal `cubic-bezier` values in components — all easing
   goes through `--ease-*`. Durations are the only literals (see finding 1).
4. **FX layer repaint cost.** `fx-drift` animates registered `@property` custom props consumed
   by gradients — the browser re-rasterizes those gradient layers each frame. This is inherent
   to the effect (the light IS a gradient anchor). Mitigations already in place: the per-view
   budget (few `.fx-live` surfaces), 16s period, `.fx-hold` pauses drift during pointer-lean,
   and the reduced-motion freeze. Chrome 85+/Safari 16.4+ required for animated `@property`;
   older browsers get a static light (graceful).
5. **`Progress` embeds a `<style>` tag per instance** for `agus-progress-sweep`. Duplicate
   keyframes if multiple bars render; harmless but the keyframes belong in `motion.css`.

## Recommendations (deferred — not in v0.4 scope)

1. **Close the literal-duration hole**: route Button pulse through `--dur-pulse` (and zero
   `--dur-pulse` in the reduced block), Skeleton/Progress through a new `--dur-loading`.
   Decide policy first: loading indicators are commonly *exempted* from reduced motion —
   if exempted, document that exemption instead of freezing them.
2. **Move `agus-progress-sweep` keyframes into `motion.css`** and drop the per-instance
   `<style>` tag.
3. **Pause off-screen ambient animation**: an `IntersectionObserver` in `foil-fx.js` toggling
   `.fx-hold` on off-viewport `.fx-live` surfaces would cut repaint cost on long pages.
4. **View Transitions API** for page-level `agus-enter` choreography once baseline support
   is acceptable — would replace ad-hoc enter animations in Dialog/Drawer/Menu.
5. **A `--dur-foil` alias set** (`light/shine`) in `motion.css` so foil durations live beside
   the core motion tokens rather than only in `foil-fx.css`.
