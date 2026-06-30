Click-toggled floating GlassPanel anchored to a trigger. Unlike Tooltip (hover-only, ephemeral), Popover holds interactive content (forms, menus, color pickers, preference panels). Closes on outside click.

```jsx
<Popover trigger={<Button variant="secondary">Options</Button>} placement="bottom">
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <Switch label="Notifications" />
    <Select label="Theme" options={['Light','Dark']} />
  </div>
</Popover>

<Popover trigger={<IconButton label="Info"><i className="ph ph-info" /></IconButton>} placement="right">
  <p>Contextual details…</p>
</Popover>
```

`placement` anchors the panel side. Use for content too rich for a Tooltip, too inline for a Dialog.
