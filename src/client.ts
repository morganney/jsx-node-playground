import { hydrateRoot } from 'react-dom/client'
import { reactJsx } from '@knighted/jsx/react'
import { App } from './app.js'

hydrateRoot(document, reactJsx`<${App} name="SSR" />`)
