Compact label / status chip. Accent-light fill by default; switch `tone` for semantic states; use `pill` + `dot` for live status indicators.

```jsx
<Badge>New</Badge>
<Badge tone="success" pill dot>Live</Badge>
<Badge tone="warning" pill dot>Draft</Badge>
<Badge tone="neutral">v2.1</Badge>
<Badge tone="danger" pill>Failed</Badge>
```

Tones: `accent` (default), `neutral` (bordered), `success`, `warning`, `danger`. `pill` rounds fully for status use; `dot` prepends a tone-colored dot. Caption-size, wide tracking, semibold.
