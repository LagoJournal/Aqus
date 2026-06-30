Structured key → value pairs (a semantic `<dl>`). For profile fields, settings summaries, case-study metadata, order details. Responsive column count.

```jsx
<DescriptionList columns={2} items={[
  { term: 'Role', value: 'Lead Designer' },
  { term: 'Duration', value: '8 months' },
  { term: 'Team', value: '4 people' },
  { term: 'Stack', value: 'Figma · React' },
]} />
```

Each row is a term (uppercase label) over a value, with a hairline divider. Use `columns` for dense metadata grids.
