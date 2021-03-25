module.exports = app =>
  app
    .publicPath(app.env.get('APP_PUBLIC'))

    .when(
      app.isDevelopment,
      () =>
        app.use([
          require('@roots/bud-babel'),
          require('@roots/bud-react'),
        ]),
      () =>
        app
          .use(require('@roots/bud-esbuild'))
          .esbuild.jsx()
          .hash()
          .vendor(),
    )

    .use([
      require('@roots/bud-postcss'),
      require('@roots/bud-entrypoints'),
      require('@roots/bud-wordpress-externals'),
      require('@roots/bud-wordpress-dependencies'),
      require('@roots/bud-wordpress-manifests'),
    ])

    .proxy()
    .entry('bud-app', ['app.js', 'app.css'])
    .entry('bud-editor', ['editor.js'])
