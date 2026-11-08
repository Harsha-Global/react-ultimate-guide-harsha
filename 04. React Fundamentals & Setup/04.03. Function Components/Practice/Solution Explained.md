# Solution explanation

Extract a PageFooter component in its own file, returning a footer with a paragraph “More movies coming soon.” Import and place it after MovieSummary.

## src/App.tsx

```tsx
import PageFooter from './PageFooter.tsx';
import PageHeader from './PageHeader.tsx';
import { MovieSummary } from './MovieSummary.tsx';

export default function App() {
  return (
    <main>
      <PageHeader />
      <MovieSummary />
      <PageFooter />
    </main>
  );
}
```

## src/PageFooter.tsx

```tsx
export default function PageFooter() {
  return <footer><p>More movies coming soon.</p></footer>;
}
```

## Why this works

App imports and renders a component with one footer responsibility, without repeating the existing header or movie.
