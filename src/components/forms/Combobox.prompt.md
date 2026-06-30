Searchable single-select. Type to filter the dropdown; arrow keys + Enter to choose; selected option gets a liquid-bubble marker. Glass dropdown panel.

```jsx
const [country, setCountry] = React.useState('');
<Combobox label="Country" value={country} onChange={setCountry}
  options={['Argentina','Brazil','Chile','Uruguay']} />
```

Options are strings or `{value, label}`. Use over Select when the list is long (>8) or users will type to find an option. For multiple choices use MultiSelect.
