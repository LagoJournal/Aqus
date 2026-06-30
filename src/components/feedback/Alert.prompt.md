Inline callout — tone-tinted surface with a liquid-bubble status marker. Deliberately avoids the accent left-bar trope.

```jsx
<Alert tone="success" title="Saved" onClose={dismiss}>Your changes are live.</Alert>
<Alert tone="warning" title="Heads up">This action can't be undone.</Alert>
<Alert tone="danger">Something went wrong.</Alert>
```

Tones: `accent` · `success` · `warning` · `danger`. `title` + body `children`; pass `onClose` for a dismiss ×.
