// @ts-check

/**
 * Sage Theme
 *
 * @typedef {import('../../lib/types').Sage} Sage
 * @type {(sage: Sage) => Sage}
 */

module.exports = (sage) =>
  sage
    .entry({
      app: ['**/app.{js,css}'],
      editor: ['**/editor.{js,css}'],
      customizer: ['scripts/customizer.js'],
    })
    .assets(['resources/images', 'resources/fonts']);
