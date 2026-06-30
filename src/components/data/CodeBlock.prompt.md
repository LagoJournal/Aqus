Code display surface in JetBrains Mono with a header (language label + copy button) and optional line numbers. Flat Level-1 surface, never glass.

```jsx
<CodeBlock language="css" code={`--accent: oklch(0.65 0.20 250);`} />
<CodeBlock language="tsx" showLineNumbers code={source} />
```

The copy button writes to the clipboard and flips to a check for ~1.6s. For inline code in prose use a `<code>` tag; this is for multi-line blocks.
