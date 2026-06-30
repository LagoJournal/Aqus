Accent progress bar — bone track, accent fill, rounded ends. Determinate by `value` (springs on change) or indeterminate sweep when `value` is null.

```jsx
<Progress value={64} label="Uploading" showValue />
<Progress value={null} label="Syncing…" />   {/* indeterminate */}
```
