The Aqus brand mark — the locked Sony-Ericsson-style liquid identity carrying the "A". A slowly-morphing aqua drop tinted by the active accent.

```jsx
<Monogram size={120} />              {/* hero / app icon */}
<Monogram size={30} />               {/* nav / sidebar */}
<Monogram size={32} animate={false} /> {/* favicon / print — static drop */}
```

Scales from favicon to billboard via `size`. Tints to the current `--accent`, so it adapts per surface (set `data-accent` on a parent). Pair with `<Wordmark>` for full lockups. Disable `animate` where motion isn't wanted (print, dense lists).
