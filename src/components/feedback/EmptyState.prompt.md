Zero-data placeholder with a large morphing liquid blob in the background — the brand's organic texture applied to blank slates. The blob is purely visual (blurred, low opacity) and never distracts from the action.

```jsx
<EmptyState
  title="No projects yet"
  description="Create your first project to get started."
  icon={<i className="ph ph-folder" />}
  action={<Button variant="primary" icon={<i className="ph ph-plus" />}>New project</Button>}
/>

<EmptyState title="Search returned nothing" description="Try a different query." />
```

Keep `title` short (≤5 words). `description` ≤ 20 words. Always offer an `action` if the user can fix the empty state. Use in table bodies, list views, filtered results.
