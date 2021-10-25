/**
 * @typedef {import('@roots/bud').Bud} Bud
 *
 * @param {Bud} bud
 */
module.exports = app =>
  app
    .use([require('@roots/bud-esbuild')])
    .template()
    .entry({app: 'app.js'})
    .runtime()
    .splitChunks()
    .hash()
