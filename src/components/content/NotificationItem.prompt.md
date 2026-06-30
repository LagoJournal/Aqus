A single row for a notification feed or inbox. Unread state tints the background and shows a liquid-bubble marker; supports a leading icon or avatar, title, body, and timestamp.

```jsx
<NotificationItem
  icon={<i className="ph ph-git-pull-request" />}
  title="Maria merged your PR"
  body="Aero Mail · feat/glass-nav"
  time="2m"
  unread
  onClick={open}
/>
<NotificationItem avatar={<Avatar name="JR" size={36} />} title="New comment" time="1h" tone="success" />
```

Stack several inside a Card or Drawer for an inbox. `tone` colors the icon + unread marker. Omit `onClick` for read-only feeds.
