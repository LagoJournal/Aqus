Image-first card — full-bleed media on top, content below. Hover lifts the card and zooms the media. Use for galleries, product grids, video/article thumbnails. (BlogCard is text-led; MediaCard is media-led.)

```jsx
<MediaCard
  media="/cover.jpg"
  badge={<Badge tone="accent" pill>New</Badge>}
  title="Project showcase"
  subtitle="Product design · 2026"
  href="/work/showcase"
/>
<MediaCard media={<video … />} overlay={<i className="ph ph-play-circle" style={{fontSize:48,color:'#fff'}} />} title="Watch the demo" />
```

`media` takes an image URL or any node (video, `<image-slot>`). `overlay` centers content over the media (play button, label); `badge` pins top-left. Omit title/subtitle for a pure media tile.
