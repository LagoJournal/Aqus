Frosted Aero glass surface — blur-behind, accent-tinted film, and an inner top-gloss stripe with light-catching edges. Use for structural chrome only: nav bars, modals, sidebars, floating toolbars, hero cards. Never for body text, tables, or form inputs.

```jsx
<GlassPanel radius="lg" style={{ padding: 'var(--space-5)' }}>
  <h3>Frosted chrome</h3>
  <p>Sits over a blurred, colorful background.</p>
</GlassPanel>

<GlassPanel as="nav" radius="pill" style={{ padding: '8px 16px' }}>…</GlassPanel>
```

Always place over a textured / colorful / image background so the blur reads. On a flat surface the glass effect disappears. Pair with a `data-accent` scope to tint the film per project.
