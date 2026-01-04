# jsx-node-playground

A lightweight sandbox for exercising the `@knighted/jsx` DOM and React runtimes directly in Node.

## Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Run any of the scripts below to inspect the logs.

## Available scripts

| Command                                  | Description                                                                                                                                      |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `node scripts/show-diagnostics.mjs`      | Forces debug diagnostics on and demonstrates warnings/errors for lowercase events, invalid handlers, and bad `dangerouslySetInnerHTML` payloads. |
| `node scripts/show-error-codeframes.mjs` | Throws parser errors to showcase the enhanced codeframes and line/column reporting.                                                              |
| `node scripts/check-ssr.mjs`             | Runs the DOM helper plus the Node React helper to verify SSR output and hybrid shells.                                                           |
| `npm run check:ssr:ts`                   | Executes the TypeScript version of the SSR smoke test via `tsx`, ensuring typings and DOM narrowing behave.                                      |

Feel free to add new scripts that capture other runtime scenarios—just drop them under `scripts/` and document them here.

## SSR + hydration demo

1. Build the server and client bundles:

   ```sh
   npm run bundle
   ```

2. Start the server:

   ```sh
   npm start
   ```

3. Visit http://localhost:3000 to see the SSR shell hydrate on the client; refresh after edits and rerun the bundle step to pick up changes.
