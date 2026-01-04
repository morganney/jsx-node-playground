import { hydrateRoot } from 'react-dom/client'
import { reactJsx } from '@knighted/jsx/react'
import { App } from './app.js'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Hydration target #root not found')
}

hydrateRoot(root, reactJsx`<${App} name="SSR" />`)
