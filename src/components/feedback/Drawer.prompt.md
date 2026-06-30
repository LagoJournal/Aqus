Slide-in glass panel anchored to a screen edge — sibling of Dialog, for side content rather than centered modals. Spring slide, dimmed blurred backdrop, Escape to close.

```jsx
const [open, setOpen] = React.useState(false);
<Button onClick={() => setOpen(true)}>Filters</Button>
<Drawer open={open} onClose={() => setOpen(false)} side="right" title="Filters">
  <FilterBar … />
  <Checkbox … />
</Drawer>
```

`side` anchors to left/right (width) or top/bottom (height). Use for filter panels, detail views, mobile nav, cart. Use Dialog for focused confirmations, Popover for small inline content.
