Select with a flat Level-1 trigger and a Level-3 Aero-glass dropdown panel; the selected row is marked with a small liquid bubble.

```jsx
<Select
  label="Workspace"
  value={ws}
  onChange={setWs}
  options={[{ value: 'personal', label: 'Personal' }, { value: 'studio', label: 'Aqus Studio' }]}
/>
```

`options` accepts strings or `{value,label}`. Controlled via `value` + `onChange`. Closes on outside-click; the panel springs in. For 2–4 mutually-exclusive choices prefer `SegmentedControl`.
