Keyboard key token with brushed-bone Aero depth (top-gloss + border-bottom key-cap effect). `KbdShortcut` renders a key sequence.

```jsx
<Kbd>⌘</Kbd>
<KbdShortcut keys={['⌘', 'K']} />
<KbdShortcut keys={['Ctrl', 'Shift', 'P']} />

{/* Inline in prose: */}
Press <KbdShortcut keys={['⌘','S']} /> to save.
```

Use `Kbd` for a single key in prose or a legend. Use `KbdShortcut` for a key combination. Always use the platform glyph (⌘ ⌥ ⇧) not the word.
