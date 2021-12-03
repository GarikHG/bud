/**
 * @typedef {import('@roots/bud').Bud} Bud
 *
 * @param {Bud} app
 */
module.exports = async (app) => {
  app
    .alias({
      '@scripts': app.path('src', 'scripts'),
      '@images': app.path('src', 'images'),
    })
    .entry({
      js: app.path('src', 'scripts', 'app.js'),
      css: app.path('src', 'styles', 'app.css'),
    })
    .template({
      template: app.path('src', 'html', 'index.html'),
    })
    .watch([app.path('src', '**/*')])
    .proxy();
};
