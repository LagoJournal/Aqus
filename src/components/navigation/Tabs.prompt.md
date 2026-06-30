Underline tabs with a sliding accent indicator. For 2–4 compact, mutually-exclusive views prefer `SegmentedControl`; use Tabs for section navigation.

```jsx
const [tab, setTab] = React.useState('overview');
<Tabs value={tab} onChange={setTab}
  tabs={[{ value: 'overview', label: 'Overview' }, { value: 'activity', label: 'Activity' }, { value: 'files', label: 'Files' }]} />
```

`tabs` accepts strings or `{value,label}`. Controlled via `value` + `onChange`.
