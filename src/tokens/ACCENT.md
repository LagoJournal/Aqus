# Accent system — how to set your brand color

The Aqus accent system uses 9 CSS custom properties derived from a single OKLCH color. Override them in your own `:root {}` block (after linking `styles.css`) to apply your brand accent.

## Constraints

Every accent must satisfy:

| Property | Range | Why |
|---|---|---|
| L (lightness) | 0.55 – 0.72 | Readable on both light canvas and dark surface. Below 0.55 = too dark on light; above 0.72 = washes out on white. |
| C (chroma) | 0.12 – 0.24 | Distinct from neutrals, not garish. High-C hues (red, yellow) use lower C; low-C hues (blue, teal) can go higher. |
| H (hue) | any | Brand-free — choose freely. |
| Contrast | ΔL ≥ 0.65 | `--accent-text` on `--accent-light` must be readable. `--on-accent` on `--accent` must be legible. |

## Derivation formula

Given your chosen H (hue) and C (chroma), set:

```
--accent:       oklch( L      C       H    )   base interactive color
--accent-hover: oklch( L-0.06 C+0.02  H    )   darker + slightly more saturated
--accent-light: oklch( 0.92   C×0.35  H    )   tinted wash background
--accent-mid:   oklch( 0.78   C×0.55  H    )   fills, tags, chips
--accent-text:  oklch( 0.25   C×0.25  H    )   text on light tinted surfaces
--accent-glow:  oklch( L      C       H / 0.25 )   ambient halo
--accent-glass: oklch( L      C       H / 0.12 )   glass tint film
--focus-ring:   oklch( L      C+0.04  H / 0.80 )   keyboard focus ring
--on-accent:    oklch( 0.99   0.005   H    )   text/icon on solid accent button
```

## Worked example — Amber (H 42, C 0.22, L 0.62)

```css
:root {
  --accent:       oklch(0.62 0.22  42);
  --accent-hover: oklch(0.56 0.24  42);
  --accent-light: oklch(0.92 0.077 42);
  --accent-mid:   oklch(0.78 0.121 42);
  --accent-text:  oklch(0.25 0.055 42);
  --accent-glow:  oklch(0.62 0.22  42 / 0.25);
  --accent-glass: oklch(0.62 0.22  42 / 0.12);
  --focus-ring:   oklch(0.62 0.26  42 / 0.80);
  --on-accent:    oklch(0.99 0.005 42);
}
```

## Dark mode

In dark mode, raise L by ~+0.08 and shift `--accent-light` / `--accent-mid` up to sit above the dark surface ramp (bg 0.165, surface 0.215, raised 0.265). Add inside `[data-theme="dark"]`:

```css
[data-theme="dark"] {
  --accent:       oklch(0.70 0.22  42);   /* L + 0.08 */
  --accent-hover: oklch(0.76 0.20  42);
  --accent-light: oklch(0.30 0.077 42);   /* sits above surface 0.215 */
  --accent-mid:   oklch(0.42 0.121 42);
  --accent-text:  oklch(0.88 0.055 42);
  --accent-glow:  oklch(0.70 0.22  42 / 0.28);
  --accent-glass: oklch(0.70 0.22  42 / 0.12);
  --focus-ring:   oklch(0.70 0.26  42 / 0.75);
  --on-accent:    oklch(0.15 0.02  42);
}
```
