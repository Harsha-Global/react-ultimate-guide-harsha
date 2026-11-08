# Willow House booking studio — failure and recovery test

The completed project of Test Failure and Recovery. Its tests (`npm run test:run`, with `npm run check:tests` for their types) cover placesFor, the Option Picker selection, the booking reducer rules, the request schema, the form's validation message, the request helper against Mock Service Worker responses (tests/server.ts), the pending form and recovery after a failed submission.

Continue the supplied TypeScript Booking Studio. Windows working location: `C:\react\booking-studio`. Use a supported Node version matching `engines` in package.json.

```powershell
npm ci
npm run check:tests
npm run build
```

For manual app use, run `npm run api` in one terminal and `npm run dev` in another. Vite uses port 5210; the supplied API uses port 4318. Playwright, when present, starts both processes itself: stop manually running copies first.

The real demo API stores bookings in memory. Reloading a confirmation works while that process remains running; restarting it clears saved bookings. MSW is used only by the component/helper tests. No remote API or paid service is required.

Original prepared CSS, local fonts and licenses are retained. Dependencies remain pinned by package-lock.json. Do not copy node_modules or build output between checkpoints.
