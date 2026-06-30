A row of toggle buttons (toolbar-style), single or multiple selection. Pressed buttons fill with accent. Use for formatting toolbars, view switches, alignment, filter toggles — not Switch (which is for on/off settings) or SegmentedControl (mutually-exclusive view picker with one always active).

```jsx
const [view, setView] = React.useState('grid');
<ToggleGroup value={view} onChange={setView}
  options={[{value:'grid',icon:<i className="ph ph-squares-four"/>},{value:'list',icon:<i className="ph ph-list"/>}]} />

const [fmt, setFmt] = React.useState(['bold']);
<ToggleGroup multiple value={fmt} onChange={setFmt}
  options={[{value:'bold',icon:<i className="ph ph-text-b"/>},{value:'italic',icon:<i className="ph ph-text-italic"/>}]} />
```

`multiple` allows several pressed at once (formatting). Single mode allows deselect. Options are strings or `{value, label, icon}`.
