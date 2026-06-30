Full-width announcement bar for page-level messages — sits above the nav, spans the page. Distinct from Alert (inline, card-scoped). Tone variants, optional icon, inline action, and dismiss.

```jsx
<Banner tone="accent" icon={<i className="ph ph-sparkle" />} action={<a href="#" style={{color:'inherit',textDecoration:'underline'}}>Learn more</a>}>
  New: liquid identity v2 is live
</Banner>
<Banner tone="warning" onClose={dismiss}>Your trial ends in 3 days.</Banner>
```

Use for launch notices, trial/billing warnings, maintenance windows. Keep copy to one line. For contextual messages inside a form or card, use Alert.
