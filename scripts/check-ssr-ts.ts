import { jsx } from '@knighted/jsx/node'
import { reactJsx } from '@knighted/jsx/node/react'
import type { JsxRenderable } from '@knighted/jsx'
import { renderToString } from 'react-dom/server'

type Todo = {
  label: string
  done: boolean
}

const todos: Todo[] = [
  { label: 'Render JSX templates', done: true },
  { label: 'Verify diagnostics', done: true },
  { label: 'Ship release candidate', done: false },
]

const logHeading = (message: string) => {
  console.log(`\n${message}`)
}

const expectElement = (value: JsxRenderable, label: string): Element => {
  if (value instanceof Element) {
    return value
  }

  throw new Error(`${label} should return an Element, but received ${typeof value}`)
}

const createDomSnapshot = (items: Todo[]) =>
  jsx`
    <main data-kind="ssr-check-ts">
      <h1>Server-rendered snapshot (TypeScript)</h1>
      <ul>
        ${items.map(
          item =>
            jsx`<li data-status={${item.done ? 'done' : 'todo'}}>${item.label}</li>`,
        )}
      </ul>
    </main>
  `

const domTree = expectElement(createDomSnapshot(todos), 'createDomSnapshot')
logHeading('DOM SSR outerHTML')
console.log(domTree.outerHTML)

if (typeof document !== 'undefined') {
  document.body.append(domTree)
  console.log(
    'Appended to simulated DOM via @knighted/jsx/node shim, child count:',
    document.body.childNodes.length,
  )
  document.body.textContent = ''
}

const ReactTodoList = ({ items }: { items: Todo[] }) =>
  reactJsx`
    <ul>
      ${items.map(
        item =>
          reactJsx`<li data-react-status={${item.done ? 'done' : 'todo'}}>${item.label}</li>`,
      )}
    </ul>
  `

const reactMarkup = renderToString(
  reactJsx`
    <section className="react-ssr-ts">
      <h2>React subtree rendered via reactJsx</h2>
      <${ReactTodoList} items={${todos}} />
    </section>
  `,
)

logHeading('React SSR markup')
console.log(reactMarkup)

const hybridShell = expectElement(
  jsx`
  <article data-kind="hybrid-ssr-ts">
    <h2>React markup injected into DOM shell (TS)</h2>
    <div dangerouslySetInnerHTML={${{ __html: reactMarkup }}}></div>
  </article>
  `,
  'hybrid shell template',
)

logHeading('Combined DOM + React shell')
console.log(hybridShell.outerHTML)
