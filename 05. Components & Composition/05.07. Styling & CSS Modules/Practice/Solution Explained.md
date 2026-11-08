# Solution explanation

In MovieCard.module.css, change .card gap to 12px and add a 1px solid #788597 border to .poster. Preserve status borders/text.

## src/MovieCard.module.css

```css
.card {
  display: grid;
  gap: 12px;
  border: 2px solid #788597;
  border-radius: 16px;
}

.available { border-color: #008577; }
.upcoming { border-color: #725a9c; }
.poster { border: 1px solid #788597; max-width: 100%; height: auto; border-radius: 10px; }
.status { font-weight: 600; }
.card h3, .card p { margin: 0; }
```

## Why this works

The local class rules change spacing and poster border while preserving the independent availability classes.
