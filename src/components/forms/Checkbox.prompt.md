Rounded-square checkbox with Aqua gloss — accent fill + white tick when checked. Square form is intentional; for the round/liquid selection use `Radio`.

```jsx
<Checkbox checked={a} onChange={setA} label="Email me updates" />
<Checkbox indeterminate onChange={() => {}} label="Select all" />
<Checkbox checked disabled onChange={() => {}} label="Locked" />
```

Controlled via `checked` + `onChange(next)`. `indeterminate` shows a dash. Pass `label` for an inline label.
