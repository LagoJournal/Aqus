Action dropdown in a Level-3 glass panel. Pass a `trigger` node and a list of items.

```jsx
<Menu
  trigger={<Button variant="secondary" size="sm">Options ▾</Button>}
  items={[
    { label: 'Rename', onClick: rename },
    { label: 'Duplicate', onClick: dup },
    { divider: true },
    { label: 'Delete', onClick: del, danger: true },
  ]}
/>
```

Items: `{label, onClick, icon?, danger?}` or `{divider:true}`. `align` left/right. Closes on outside-click / select.
