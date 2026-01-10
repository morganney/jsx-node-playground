import { reactJsx } from '@knighted/jsx/react'
import { Button } from './button.js'

export const App = ({ name }: { name: string }) =>
  reactJsx`<main><h1>Hello, ${name}</h1><${Button} label="Tap me" /></main>`
