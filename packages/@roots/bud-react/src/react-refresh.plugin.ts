import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types'
import type {Extension} from '@roots/bud-framework'

import {reactRefresh} from './bud.reactRefresh'

/**
 * {@inheritDoc BudReactRefreshWebpackPlugin}
 *
 * @public
 */
export interface BudReactRefreshWebpackPlugin
  extends Extension.CompilerPlugin<
    ReactRefreshWebpackPlugin,
    ReactRefreshPluginOptions
  > {}

/**
 * Adds react-refresh-webpack-plugin
 *
 * @public
 */
export const BudReactRefreshWebpackPlugin: BudReactRefreshWebpackPlugin =
  {
    name: '@pmmmwh/react-refresh-webpack-plugin',

    options: {
      overlay: false,
    },

    make: opt => new ReactRefreshWebpackPlugin(opt.all()),

    when: ({isDevelopment}) => isDevelopment,

    api: {
      reactRefresh,
    },
  }
