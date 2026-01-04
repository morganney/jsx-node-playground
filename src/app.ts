import { reactJsx } from '@knighted/jsx/node/react'

const Button = ({ label }: { label: string }) =>
  reactJsx`<button onClick={${() => {
    alert('Button clicked')
  }}}>${label}</button>`

export const App = ({ name }: { name: string }) =>
  reactJsx`<main><h1>Hello, ${name}</h1><${Button} label="Tap me" /></main>`
