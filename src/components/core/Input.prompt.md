Flat Level-1 text field — interior content surface, never glass. Focus draws a 2px accent border plus a 4px soft Aero glow halo.

```jsx
<Input label="Email" placeholder="you@agus.dev" type="email" />
<Input label="Search" icon={<SearchIcon />} placeholder="Find a project" />
<Input label="Slug" hint="Lowercase, no spaces" />
<Input label="Handle" error="That handle is taken" defaultValue="agus" />
```

Pass `label`, `hint`, `error`, and a leading `icon`. All standard input attributes pass through. Keep inputs flat (Level 1) — the glass treatment is reserved for chrome, not data entry.
