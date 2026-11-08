# Hook placement comparisons

These are teaching comparisons, not files to leave in the working project. The useState calls must be top-level component calls before conditional returns.

```tsx
// Wrong: the call can disappear between renders.
if (enabled) {
  const [count, setCount] = useState(0);
}
```

```tsx
// Wrong: an event handler is not a component or custom Hook.
function handleClick() {
  const [count, setCount] = useState(0);
}
```

```tsx
// Correct: call the Hook consistently, then choose what to display.
const [count, setCount] = useState(0);
if (!enabled) return null;
return <button onClick={() => setCount(current => current + 1)}>{count}</button>;
```

This lecture concerns useState and ordinary Hooks; it does not claim that every React API with a use-like spelling has identical restrictions. The special use API is not introduced here.
