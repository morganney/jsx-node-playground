import { jsx } from '@knighted/jsx/node'
import { enableJsxDebugDiagnostics } from '@knighted/jsx/debug-tools'

// Force diagnostics on so the warnings/errors always surface.
enableJsxDebugDiagnostics({ mode: 'always' })

console.log('Running @knighted/jsx diagnostics showcase...\n')
console.log('1) Lowercase DOM event (expect a console warning):')
jsx`
  <button onclick={${() => console.log('clicked')}}>Click me</button>
`

const showcase = (label, fn) => {
  console.log(`\n${label}`)
  try {
    fn()
  } catch (error) {
    console.error(error.message)
  }
}

showcase('2) Invalid event handler (should throw)', () => {
  jsx`
    <button onClick={${'not a function'}}>Broken handler</button>
  `
})

showcase('3) Bad dangerouslySetInnerHTML payload (should throw)', () => {
  jsx`
    <div dangerouslySetInnerHTML={${'plain string'}}></div>
  `
})

console.log(
  '\nDone. Re-run this script after local changes to view the diagnostics again.',
)
