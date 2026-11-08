# Run the main app and hosting comparisons

Requires Node.js >=22.22.0. The supplied projects pin React 19.3.0, React Router 8.4.0 and Vite 8.3.0. In `routed-directory`, run `npm ci`, then `npm run api` in one terminal and `npm run dev` in another. Open http://127.0.0.1:5183. Keep the API running on 4183. A clean API start restores the sample employee data.

Run `npm run check`, `npm run lint` and `npm run build` to verify a project. `Styles` preserves the supplied stylesheet copies and the runnable projects include local font files/licenses.

For Windows hosting comparisons copy the main app to `C:\react\routed-directory`, the supplied hosting directory to `C:\react\routing-hosts`, and the isolated HashRouter app to `C:\react\routed-directory-hash`. Follow `Demonstrations/README.md` for the exact commands and local URLs. Test plain-host internal navigation followed by reload 404; application fallback direct-link/reload success; API health JSON; missing asset 404; and HashRouter direct-link/reload success. The HashRouter route fragment must stay intact when using Skip to content.

Stop only your own local demonstration servers when finished. Keep the BrowserRouter app as the main checkpoint for the next section.
