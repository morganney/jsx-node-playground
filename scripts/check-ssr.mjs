import { jsx } from '@knighted/jsx/node'
import { reactJsx } from '@knighted/jsx/node/react'
import { renderToString } from 'react-dom/server'

const todos = [
  { label: 'Render JSX templates', done: true },
  { label: 'Verify diagnostics', done: true },
  { label: 'Ship release candidate', done: false },
]

const createTodoList = todos =>
  jsx`
    <main data-kind="ssr-check">
      <h1>Server-rendered snapshot</h1>
      <ul>
        ${todos.map(
          todo =>
            jsx`<li data-status={${todo.done ? 'done' : 'todo'}}>${todo.label}</li>`,
        )}
      </ul>
    </main>
  `

const tree = createTodoList(todos)
console.log('SSR DOM outerHTML:')
console.log(tree.outerHTML)

if (typeof document !== 'undefined') {
  document.body.append(tree)
  console.log(
    '\nAppended to simulated DOM via @knighted/jsx/node shim, child count:',
    document.body.childNodes.length,
  )
  document.body.textContent = ''
}

const ReactTodoList = ({ items }) =>
  reactJsx`
    <ul>
      ${items.map(
        todo =>
          reactJsx`<li data-react-status={${todo.done ? 'done' : 'todo'}}>${todo.label}</li>`,
      )}
    </ul>
  `

const reactMarkup = renderToString(
  reactJsx`
    <section className="react-ssr">
      <h2>React subtree rendered via reactJsx</h2>
      <${ReactTodoList} items={${todos}} />
    </section>
  `,
)

console.log('\nReact SSR markup:')
console.log(reactMarkup)

const hybridShell = jsx`
  <article data-kind="hybrid-ssr">
    <h2>React markup injected into DOM shell</h2>
    <div dangerouslySetInnerHTML={${{ __html: reactMarkup }}}></div>
  </article>
`

console.log('\nCombined DOM + React shell:')
console.log(hybridShell.outerHTML)
