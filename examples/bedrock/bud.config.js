const path = require('path')

/**
 * @typedef {import('@roots/bud').Bud} Bud
 *
 * @param {Bud} bud
 */
module.exports = async bud => {
  bud
    .setPath({
      src: 'web/app/themes/sage/resources',
      dist: 'web/app/themes/sage/public',
    })
    .entry({
      app: '**/app.{js,css}',
      editor: '**/editor.{js,css}',
    })
    .when(bud.isDevelopment, () => {
      bud
        .serve({
          host: 'http://bedrock.test',
          port: 3000,
        })
        .proxy({
          target: 'http://bedrock.test',
        })
    })
}
