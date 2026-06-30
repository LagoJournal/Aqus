Standalone icon action. Uses the LIQUID_BLOB border-radius (not a circle) so even the smallest touch target expresses the brand identity. Scales from sm (30px) to lg (48px).

```jsx
<IconButton label="Search"><i className="ph ph-magnifying-glass" style={{fontSize:18}} /></IconButton>
<IconButton variant="soft" label="Settings"><i className="ph ph-gear" style={{fontSize:18}} /></IconButton>
<IconButton variant="filled" label="Add"><i className="ph ph-plus" style={{fontSize:20}} /></IconButton>
<IconButton label="Close" size="sm"><i className="ph ph-x" style={{fontSize:14}} /></IconButton>
```

Variants: `ghost` (transparent, hover = accent-light), `soft` (bone surface + border), `filled` (accent). Always pass `label` for accessibility. For icon+text use Button with the `icon` prop instead.
