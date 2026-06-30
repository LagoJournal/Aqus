Calendar date picker in a glass popover. Selected day is a filled liquid blob; today is an outline ring; month navigation via blob icon buttons.

```jsx
const [date, setDate] = React.useState(null);
<DatePicker label="Due date" value={date} onChange={setDate} />
```

`value` accepts a Date or date string. `onChange` receives a Date. For ranges, compose two DatePickers (start / end). Day cells and nav buttons all use the liquid-blob shape.
