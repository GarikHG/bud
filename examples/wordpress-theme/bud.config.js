// @ts-check
const {bud} = require('../../packages/bud')

/**
 * This is specific for the Bud monorepo only.
 *
 * You do not need to include this hook in your project
 * configuration file.
 */
bud.hooks.on('webpack.resolve.modules', modules => {
  return [...modules, bud.project('./../../node_modules')]
})

/**
 * Set public path
 */
bud.publicPath(bud.env.get('APP_PUBLIC'))

/**
 * Required extensions
 */
bud.use([
  require('@roots/bud-babel'),
  require('@roots/bud-react'),
  require('@roots/bud-postcss'),
  require('@roots/bud-entrypoints'),
  require('@roots/bud-wordpress-externals'),
  require('@roots/bud-wordpress-dependencies'),
  require('@roots/bud-wordpress-manifests'),
])

/**
 * Enable proxying
 */
bud.proxy()

/**
 * Set entrypoints
 */
bud.entry('bud-app', ['app.js', 'app.css'])
bud.entry('bud-editor', ['editor.js'])

/**
 * Run build.
 */
bud.run()
