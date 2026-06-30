Radio control whose selected indicator IS a `LiquidBubble` — the round element becomes the liquid drop. Use `RadioGroup` to manage a set.

```jsx
<RadioGroup
  value={plan}
  onChange={setPlan}
  options={[{ value: 'free', label: 'Free' }, { value: 'pro', label: 'Pro' }, { value: 'team', label: 'Team' }]}
/>

<Radio checked={v === 'a'} value="a" onChange={setV} label="Option A" />
```

`RadioGroup` takes `options` (strings or `{value,label,disabled}`), `value`, `onChange`, and `direction` (`column`/`row`). Single `Radio` is controlled via `checked` + `onChange`.
