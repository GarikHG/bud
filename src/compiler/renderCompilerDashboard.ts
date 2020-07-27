import webpack from 'webpack'
import React from 'react'
import {render} from 'ink'
import {Runner} from './Runner'
import type {
  Bud,
  BudRenderer,
  RunnerProps,
  WebpackConfig,
} from './types'

import browserSync from 'browser-sync'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { bud } from '../bud'

const makeMiddleware = (webpackConfig, compiler) => [
  webpackDevMiddleware(compiler, {
    headers: bud.state.options.dev.headers,
    logLevel: 'silent',
    publicPath: bud.state.paths.public || '/',
    stats: {
      all: false,
    }
  }),
  webpackHotMiddleware(compiler, {
    log: () => {},
  }),
]

const injectHot = (webpackConfig: WebpackConfig) => {
  const client = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&overlay=true';

  Object.keys(webpackConfig.entry).forEach(entry => {
    webpackConfig.entry[entry] = [client].concat(webpackConfig.entry[entry])
  })

  return webpackConfig
}

const hotSyncServer = (
  bud: Bud,
  webpackConfig: WebpackConfig,
  compiler
) => {
  browserSync.init({
    proxy: {
      target: 'bud-sandbox.valet',
      ws: true,
    },
    reloadOnRestart: true,
    injectFileTypes: ['js', 'css'],
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: false,
    },
    open: true,
    ui: {
      port: 3000,
    },
    middleware: makeMiddleware(webpackConfig, compiler),
    injectChanges: true,
    watchOptions: {
      ignoreInitial: true
    },
    files: [
      bud.src('**/*.js'),
      bud.src('**/*.js'),
      bud.src('*.css'),
      bud.src('**/*.css'),
    ],
  });
}

/**
 * Webpack compilation dashboard renderer.
 */
const renderCompilerDashboard: BudRenderer = (
  bud: Bud,
  webpackConfig: WebpackConfig,
): void => {
  const compiler = bud.featureEnabled('hot')
    ? webpack(injectHot(webpackConfig))
    : webpack(webpackConfig)

  bud.featureEnabled('hot') && hotSyncServer(bud, webpackConfig, compiler)

  const runnerProps: RunnerProps = {
    config: bud,
    webpackConfig,
    compiler,
  }

  const application = React.createElement(
    Runner,
    runnerProps,
  )

  /** 🚀 */
  render(application)
}

export {renderCompilerDashboard}
