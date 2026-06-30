Expand/collapse content sections. The expand indicator is a LiquidBubble — outline at rest, filled and morphing when open. Never a plain chevron.

```jsx
<Accordion items={[
  { id: 'a', title: 'What is Aqus?', content: 'A personal design language…' },
  { id: 'b', title: 'How does the accent work?', content: 'One accent per surface…' },
]} defaultOpen={['a']} />

<Accordion multiple items={faqItems} />
```

`multiple` allows several items open at once. `defaultOpen` is an array of IDs. Content height animates via `max-height` transition — keep content reasonably short (no internal overflow).
