One-time-code / PIN entry. Each digit is its own liquid-blob cell; the focused cell gets the accent ring. Auto-advances on input, supports backspace navigation and full-code paste.

```jsx
const [code, setCode] = React.useState('');
<OTPInput length={6} value={code} onChange={setCode} onComplete={verify} />
```

`onComplete` fires when every cell is filled. Use for 2FA, email verification, SMS codes. Numeric by default.
