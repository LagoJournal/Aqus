Interactive chip — removable or clickable. Unlike Badge (read-only label), Tag has an action. The remove X is a LiquidBubble: outline at rest, filled on hover.

```jsx
<Tag onRemove={() => remove(id)}>Design systems</Tag>
<Tag tone="success" onRemove={…}>v2.4</Tag>
<Tag onClick={() => filter('react')}>React</Tag>
<Tag tone="neutral" size="sm" onRemove={…}>Figma</Tag>
```

Use Tag for user-controlled chips (filter lists, skill tags, applied filters). Use Badge for read-only status. `onClick` makes the chip a button (no remove X needed). Combine both for a removable + clickable chip by providing both props.
