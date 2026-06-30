Image or initials avatar. Circle by default; `shape="bubble"` gives the liquid-blob silhouette. Optional liquid-bubble status marker.

```jsx
<Avatar name="Agustín" status="online" />
<Avatar src="/me.jpg" name="Agus" size={48} />
<Avatar name="Aqus" shape="bubble" />
```

`size`, `shape` (`circle`/`bubble`/`square`), `status` (`online`/`away`/`busy`). Falls back to up-to-2 initials from `name`.
