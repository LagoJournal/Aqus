Horizontal snap-scrolling carousel with prev/next blob buttons and liquid-bubble page dots. Each direct child becomes a slide.

```jsx
<Carousel itemWidth="320px" gap={16}>
  <MediaCard … />
  <MediaCard … />
  <MediaCard … />
</Carousel>

<Carousel>            {/* one full-width slide at a time */}
  <img … /><img … />
</Carousel>
```

`itemWidth` controls how many show at once ('100%' = one; '320px' = a peeking row). Use for image galleries, testimonial rows, featured cards. Dots and arrows are toggleable.
