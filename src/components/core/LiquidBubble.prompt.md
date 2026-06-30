The shared organic-blob primitive behind every "round" element in Aqus — born from the sidebar's selected-item drop. Reach for this instead of a perfect circle so new components inherit the liquid identity automatically.

```jsx
<LiquidBubble size={8} />                              {/* status dot */}
<LiquidBubble size={20} color="linear-gradient(to bottom,#fff,#ECECEC)" glossy />  {/* toggle knob */}
<LiquidBubble variant="outline" size={16} />           {/* idle / empty marker */}
<LiquidBubble variant="spinner" size={22} />           {/* loading */}
```

Variants: `filled` (solid accent drop — dots, knobs, ticks), `outline` (morphing ring), `spinner` (rotating accent arc). `color` overrides the accent (accepts gradients); `glossy` adds a white highlight for knobs; `thickness` sets ring width; `animate={false}` freezes the morph for dense lists or print. Tints to the active `--accent`, so it adapts per `data-accent` surface. Badge dots, the Switch knob, and Spinner are all built on it.
