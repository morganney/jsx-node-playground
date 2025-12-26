import { jsx } from '@knighted/jsx/node'

const runCase = (title, sample) => {
  console.log(`\n${title}`)
  try {
    sample()
  } catch (error) {
    console.error(error.message)
  }
}

console.log('Showing parser error codeframes from @knighted/jsx...')

runCase('1) Unexpected closing tag', () => {
  jsx`
    <section>
      </div>
    </section>
  `
})

runCase('2) Unterminated attribute value', () => {
  jsx`
    <button className="primary>
      Missing quote
    </button>
  `
})

console.log(
  '\nEach error above should include the new line/column info and codeframe output.',
)
