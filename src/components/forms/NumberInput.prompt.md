Numeric stepper with liquid-blob +/− buttons. Clamps to `min`/`max`; step configurable. Direct input editing supported.

```jsx
const [size, setSize] = React.useState(16);
<NumberInput label="Font size" value={size} onChange={setSize} min={8} max={96} step={2} unit="px" />
<NumberInput value={qty} onChange={setQty} min={1} max={99} />
```

Use for bounded integers and floats where keyboard entry + step buttons both make sense. For unbounded numeric text, use plain `Input type="number"` instead.
