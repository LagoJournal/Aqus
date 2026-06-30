Multi-choice select. Selected options render as removable chips inside the field; the dropdown marks chosen rows with a liquid bubble.

```jsx
const [tags, setTags] = React.useState(['react']);
<MultiSelect label="Skills" value={tags} onChange={setTags}
  options={['react','figma','css','oklch','motion']} />
```

`value` is an array. Click a chip's X (or its row) to remove. Use for tags, filters, recipients, skill lists. For a single choice use Combobox or Select.
