Pill-shaped Aqua button with inner top-gloss, two-shadow depth, and spring press feedback — the primary call-to-action across every Aqus surface.

```jsx
<Button variant="primary" size="md" onClick={save}>Save changes</Button>
<Button variant="secondary" icon={<PlusIcon />}>New project</Button>
<Button variant="ghost" size="sm">Cancel</Button>
<Button variant="destructive">Delete</Button>
<Button variant="primary" pulse>Get started</Button>   {/* ambient glow for default actions */}
```

Variants: `primary` (accent fill + gloss), `secondary` (bone surface, accent border), `ghost` (transparent, for inside glass panels), `destructive` (red family). Sizes: `sm` / `md` / `lg`. Set `pulse` for the Aqua ambient-glow default-action treatment in modals. Press feedback scales to 0.96–0.97; hover lifts via shadow. Always exactly one accent per surface.
