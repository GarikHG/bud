import {Item, Loader} from '@roots/bud-build'
import {Extension, Framework} from '@roots/bud-framework'

import {Config} from './babel.config'
import {
  DEFAULT_PLUGINS,
  DEFAULT_PRESETS,
} from './babel.constants'

/**
 * Adds Babel transpiler support to Framework projects
 *
 * @public @config
 */
export const BudBabelExtension: Extension.Module = {
  /**
   * Extension name
   *
   * @public
   */
  name: '@roots/bud-babel',

  mixin: async app => ({
    babel: [Config, app],
  }),

  /**
   * Extension register event
   *
   * @public
   */
  register: async (app: Framework) => {
    app.build.loaders.babel = new Loader(() =>
      require.resolve('babel-loader'),
    )

    app.build.items.babel = new Item({
      loader: ({build}) => build.loaders.babel,
      options: app => {
        const options: {
          cacheDirectory: string
          env: any
          root: string
          presets?: any
          plugins?: any
        } = {
          cacheDirectory: app.path('storage', 'cache', 'babel'),
          env: {
            development: {
              compact: false,
            },
          },
          root: app.path('src'),
        }

        if (app.babel?.presets) {
          options.presets = Object.values(app.babel.presets)
        }

        if (app.babel?.plugins) {
          options.plugins = Object.values(app.babel.plugins)
        }

        return options
      },
    })

    app.build.rules.js.use = app => [app.build.items.babel]

    app.babel
      .setPresets(DEFAULT_PRESETS)
      .setPlugins(DEFAULT_PLUGINS)
  },
}
