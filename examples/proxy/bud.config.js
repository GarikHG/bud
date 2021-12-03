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
      app: [
        app.path('src', 'styles', 'app.css'),
        app.path('src', 'styles', 'app.js'),
      ],
    })
    .hooks.on('proxy.replace', (all) => {
      return [...all, ['replace_me', 'replaced']];
    })
    .watch([app.path('src', '**/*')])
    .proxy('http://localhost:8080');
};
