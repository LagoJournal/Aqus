Sortable data table with liquid-bubble sort indicators — filled bubble for the active column, outline bubble for sortable-but-inactive. Rows highlight on hover.

```jsx
<Table
  columns={[
    { key: 'name', label: 'Project', sortable: true },
    { key: 'status', label: 'Status', render: (v) => <Badge tone="success" pill dot>{v}</Badge> },
    { key: 'updated', label: 'Updated', muted: true, align: 'right' },
  ]}
  rows={data}
  sortKey="name"
  sortDir="asc"
  onSort={(key, dir) => setSort({ key, dir })}
/>
```

`striped` alternates row backgrounds. `col.render` receives `(value, row)` for custom cells. Keep `col.muted` on metadata columns (timestamps, IDs).
