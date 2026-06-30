Collapsible hierarchical tree for file explorers, nested nav, org charts. Expandable nodes use a liquid-bubble indicator (outline collapsed → filled expanded); the selected node gets an accent-light row.

```jsx
<TreeView
  nodes={[
    { id: 'src', label: 'src', icon: <i className="ph ph-folder" />, children: [
      { id: 'app', label: 'App.tsx', icon: <i className="ph ph-file-tsx" /> },
      { id: 'comp', label: 'components', icon: <i className="ph ph-folder" />, children: [...] },
    ]},
  ]}
  selectedId={sel}
  onSelect={(n) => setSel(n.id)}
  defaultExpanded={['src']}
/>
```

Nodes nest via `children`. `meta` shows a trailing badge/count. Use for sidebars in IDE-like or docs apps.
