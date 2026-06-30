Right-click context menu that wraps any child. On right-click it opens a glass menu at the cursor. Items support icons, shortcut hints, danger tone, and dividers.

```jsx
<ContextMenu items={[
  { label: 'Open', icon: <i className="ph ph-arrow-square-out" />, shortcut: '⌘O', onSelect: open },
  { label: 'Rename', icon: <i className="ph ph-pencil" />, onSelect: rename },
  { divider: true },
  { label: 'Delete', icon: <i className="ph ph-trash" />, tone: 'danger', onSelect: del },
]}>
  <Card>Right-click me</Card>
</ContextMenu>
```

Sibling of Menu (which opens from a click trigger / dropdown). Closes on outside click, scroll, or resize. Use for file rows, canvas items, list entries.
