Opinionated pill search input: leading magnifier, live clear (X) when filled, optional trailing result-count and a ⌘K shortcut hint when empty.

```jsx
const [q, setQ] = React.useState('');
<SearchInput value={q} onChange={setQ} count={results.length} placeholder="Search projects…" />
<SearchInput value={q} onChange={setQ} shortcut="⌘K" />
```

Use for filter bars, list search, table search. For a full command interface use CommandPalette.
