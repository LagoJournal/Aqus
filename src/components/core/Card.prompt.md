Elevation-tiered content surface with a subtle Aqua top-sheen. The everyday container for content blocks, project tiles, list items.

```jsx
<Card>Resting — Level 1, sits flat on the canvas.</Card>
<Card variant="raised">Raised — Level 2 popover-weight surface.</Card>
<Card variant="featured">Featured — glass tint + accent border-top.</Card>
<Card interactive onClick={open}>Lifts 2px on hover.</Card>
```

Variants map to the elevation ladder: `resting` (L1, shadow-xs), `raised` (L2, shadow-sm), `featured` (L3 accent-glass tint + soft Aero glow halo + a faint morphing liquid drop). `interactive` adds the hover lift. Disable `gloss` for flat data surfaces. Use a `GlassPanel` instead when the surface is structural chrome (nav/modal).
