The Aqus wordmark — "Aqu" set in the display face with the distinctive terminal **s** dissolved into the liquid mark (a morphing aqua drop). Connects the logotype directly to the locked liquid identity.

```jsx
<Wordmark size={56} />                          {/* default lockup */}
<Wordmark size={24} animate={false} />          {/* nav / compact, static */}
<Wordmark size={72} color="#fff" />             {/* on dark or accent surfaces */}
```

`size` is the cap height in px. The "s" drop tints to the active `--accent` (adapts per `data-accent` surface). Set `color` for the "Aqu" lettering on dark backgrounds. Pair with `<Monogram>` for stacked lockups.
