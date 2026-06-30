Breadcrumb trail separated by small liquid-bubble dots. The last item is the current page (non-interactive).

```jsx
<Breadcrumb
  items={[{ label: 'Home', value: 'home' }, { label: 'Projects', value: 'projects' }, { label: 'Aero Mail' }]}
  onNavigate={(value) => go(value)}
/>
```

`items` accepts strings or `{label,value}`. `onNavigate(value, index)` fires on non-final items.
