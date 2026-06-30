Curated color-swatch picker — deliberately a small set of options (the "one accent per surface" rule), not a freeform wheel. Each swatch is a liquid blob; the selected one morphs and gains a glow ring.

```jsx
const [accent, setAccent] = React.useState('#2A6FDB');
<ColorPicker label="Accent" value={accent} onChange={setAccent}
  options={[
    { color: '#2A6FDB', name: 'Cobalt' },
    { color: '#D97757', name: 'Amber' },
    { color: '#1F8A5B', name: 'Forest' },
  ]} />
```

Pass hex strings or `{color, name}` objects (name → tooltip + aria-label). Use for accent selection, label colors, theme pickers. Keep options curated (3–8).
