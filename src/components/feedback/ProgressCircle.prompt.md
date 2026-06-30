Determinate circular progress drawn as a liquid-blob ring (conic-gradient fill, ring-mask). Centered percentage by default. The blob shape keeps the brand identity; morph is off by default so the value stays readable.

```jsx
<ProgressCircle value={72} />
<ProgressCircle value={100} tone="success" size={48} />
<ProgressCircle value={38} tone="warning" label="used" />
<ProgressCircle value={64} morph />   {/* animated blob */}
```

Use for storage meters, completion rings, score dials. For linear/indeterminate progress use Progress; for loading use Spinner.
