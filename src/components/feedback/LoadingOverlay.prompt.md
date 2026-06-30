Dimmed, blurred cover with a liquid Spinner and optional message. Covers the nearest `position:relative` parent (a Card) or the whole viewport with `fullscreen`.

```jsx
<Card style={{ position: 'relative' }}>
  …content…
  <LoadingOverlay show={saving} message="Saving changes…" />
</Card>

<LoadingOverlay show={loading} fullscreen message="Loading workspace…" />
```

Use while a surface's data is in flight. For inline button loading use a Spinner in the Button icon; for content placeholders use Skeleton.
