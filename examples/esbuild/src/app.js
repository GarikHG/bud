import './demo'

const target = document.querySelector('body')
target.innerHTML = `
  <div>
    <h1>Hello from esbuild!</h1>
  </div>
`

/**
 * Accept module updates
 *
 * @see https://webpack.js.org/api/hot-module-replacement
 */
if (module) {
  module.hot.accept(err => {
    console.error(err)
  })
}
