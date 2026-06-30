Bone track with an accent fill and a glossy `LiquidBubble` thumb — drag or click to set. Controlled value in `[min, max]`.

```jsx
const [vol, setVol] = React.useState(60);
<Slider value={vol} onChange={setVol} label="Volume" showValue />
<Slider value={v} onChange={setV} min={0} max={10} step={0.5} />
```

Controlled via `value` + `onChange(next)`. `min`/`max`/`step`, optional `label` and `showValue`. The thumb is the shared liquid bubble (gloss, no morph while dragging).
