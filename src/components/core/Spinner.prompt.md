A morphing liquid-bubble outline with a rotating accent arc — 800ms loop. Built on `LiquidBubble` so loading stays on-brand. The default loading affordance.

```jsx
<Spinner />
<Spinner size={32} />
<Spinner animate={false} />   {/* spin only, no morph */}
<Button variant="primary" disabled icon={<Spinner size={16} />}>Saving…</Button>
```

`size`, `thickness`, and `animate` (morph on/off). For determinate progress use a progress bar instead; for content placeholders use the bone shimmer skeleton.
