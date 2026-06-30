Vertical event log / stepper. Each step's node is a LiquidBubble matching its status — filled for done, spinner for active/in-progress, outline for pending. The connector line tints to accent-mid for completed segments.

```jsx
<Timeline items={[
  { title: 'Draft created', time: '09:12', status: 'done', description: 'Initial design uploaded.' },
  { title: 'Review in progress', time: '11:45', status: 'active' },
  { title: 'Ship to production', status: 'pending' },
]} />
```

Use for changelogs, activity feeds, multi-step flows, deployment logs. `extra` accepts any React node (a Badge, a diff block, a miniature card) to embed rich content below a step.
