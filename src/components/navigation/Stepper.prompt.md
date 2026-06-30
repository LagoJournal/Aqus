Multi-step progress indicator for guided flows (checkout, onboarding, wizards). Step nodes are LiquidBubbles matching state — filled for completed, spinner for current, outline for upcoming. Connector fills accent for completed segments.

```jsx
<Stepper current={1} steps={[
  { label: 'Account', description: 'Your details' },
  { label: 'Payment', description: 'Billing info' },
  { label: 'Confirm' },
]} />

<Stepper orientation="vertical" current={2} steps={steps} />
```

`current` is the active step index (0-based); earlier steps render as done. Use `orientation="vertical"` for sidebars or tall flows. Pair with NumberInput/forms in the step body.
