# Node.js SSR + Hydration using React without TSX files and native CSS

A Node.js SSR + hydration mini-app that pairs `@knighted/jsx` (React runtime) with `@knighted/css` (compiled styles). The server renders a styled button, inlines the extracted CSS, and the client hydrates the same markup.

## Run the demo

1. Install deps (postinstall generates stable selector manifests and ambient types):

   ```sh
   npm install
   ```

2. Build server + client bundles via Rspack:

   ```sh
   npm run bundle
   ```

3. Start the SSR server and open the page:

   ```sh
   npm start
   # visit http://localhost:3000
   ```

Edits to the button or styles: rerun `npm run bundle` then refresh.

## What this shows

- `@knighted/css` loader compiles `src/button.css` and the SSR layer inlines the CSS so the first paint is styled.
- `@knighted/jsx` renders the same component tree on server and client; hydration attaches events without re-rendering.
- Stable selectors/types are generated during `npm install` (`npm run generate:types`) so TS understands `?knighted-css` imports.

## Scripts (reference)

Basic scripts exercising some @knighted/jsx behavior.

| Command                                  | Description                                                                                                                                      |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `node scripts/show-diagnostics.mjs`      | Forces debug diagnostics on and demonstrates warnings/errors for lowercase events, invalid handlers, and bad `dangerouslySetInnerHTML` payloads. |
| `node scripts/show-error-codeframes.mjs` | Throws parser errors to showcase the enhanced codeframes and line/column reporting.                                                              |
| `node scripts/check-ssr.mjs`             | Runs the DOM helper plus the Node React helper to verify SSR output and hybrid shells.                                                           |
| `npm run check:ssr:ts`                   | Executes the TypeScript version of the SSR smoke test via `tsx`, ensuring typings and DOM narrowing behave.                                      |
