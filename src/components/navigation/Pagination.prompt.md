Page controls. The active page is a filled liquid-blob button (gradient accent, not a circle); other pages are ghost; prev/next are icon blob buttons. Ellipsis for large ranges.

```jsx
const [page, setPage] = React.useState(1);
<Pagination page={page} total={24} onChange={setPage} />
<Pagination page={page} total={8} siblings={2} onChange={setPage} />
```

`siblings` controls how many page numbers appear either side of the active one. Pairs naturally with Table — place below the table card.
