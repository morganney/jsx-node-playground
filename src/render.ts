import { renderToString } from 'react-dom/server'
import { reactJsx } from '@knighted/jsx/node/react'
import { App } from './app.js'

export const render = (name: string) =>
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" src="/client.js"></script>
    <title>JSX SSR + hydration playground</title>
  </head>
  <body>
    <div id="root">${renderToString(reactJsx`<${App} name=${name} />`)}</div>
  </body>
</html>`
