Modal with a blurred backdrop and an Aero-glass panel. Closes on backdrop click / Escape. Give the default action a pulsing Button.

```jsx
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Delete project?"
  actions={<>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="destructive" pulse onClick={confirm}>Delete</Button>
  </>}
>
  This permanently removes the project and its files.
</Dialog>
```

Controlled via `open` + `onClose`. `title`, body `children`, footer `actions`, optional `width`.
