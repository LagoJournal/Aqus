Aqua segmented control — a horizontal pill where the active segment fills with accent and a sliding indicator glides between options. Heavily used in dashboards and data views for view-switching.

```jsx
const [view, setView] = React.useState('grid');
<SegmentedControl
  value={view}
  onChange={setView}
  options={[{ value: 'grid', label: 'Grid' }, { value: 'list', label: 'List' }, { value: 'board', label: 'Board' }]}
/>
<SegmentedControl size="sm" value={tab} onChange={setTab} options={['Day', 'Week', 'Month']} />
```

`options` accepts plain strings or `{value, label}`. Controlled via `value` / `onChange`. Best for 2–4 short, mutually-exclusive choices; for more, use Tabs.
