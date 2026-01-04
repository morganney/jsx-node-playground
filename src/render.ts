import { renderToString } from 'react-dom/server'
import { reactJsx } from '@knighted/jsx/node/react'
import { App } from './app.js'

export const render = (name: string) =>
  `<!doctype html><script type="module" src="/client.js"></script>${renderToString(reactJsx`<${App} name=${name} />`)}`
