Pill toggle with a glossy white knob that springs across an accent track. Aqua-native on/off control.

```jsx
const [on, setOn] = React.useState(true);
<Switch checked={on} onChange={setOn} />
<Switch checked={false} onChange={() => {}} size="sm" />
<Switch checked disabled onChange={() => {}} />
```

Controlled: pass `checked` and an `onChange(next)` handler. `size` is `sm` or `md`. The knob uses a spring easing on the slide; the track recesses with an inner shadow.
