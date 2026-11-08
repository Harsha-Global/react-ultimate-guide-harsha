# Test Reducer Rules — Practice/L13/Starter/booking-studio

Independent activity starter. Read ../../Instructions.md (two folders above). It may contain an intentionally incomplete or weak test; a passing starter does not establish a completed task.

Protect reducer rules and previous-state preservation with focused tests.

Continue the supplied TypeScript Booking Studio. Windows working location: `C:\react\booking-studio`. Use a supported Node version matching `engines` in package.json.

```powershell
npm ci
npm run test:run
npm run check:tests
npm run build
```

For manual app use, run `npm run api` in one terminal and `npm run dev` in another. Vite uses port 5210; the supplied API uses port 4318. Playwright, when present, starts both processes itself: stop manually running copies first.

The real demo API stores bookings in memory. Reloading a confirmation works while that process remains running; restarting it clears saved bookings. MSW is used only by the component/helper tests. No remote API or paid service is required.

Original prepared CSS, local fonts and licenses are retained. Dependencies remain pinned by package-lock.json. Do not copy node_modules or build output between checkpoints.
