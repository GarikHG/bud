import {Extension, Index} from '@roots/bud-framework'
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin'
import type {WebpackPluginInstance} from 'webpack'

interface BudImageMinPlugin
  extends Extension.CompilerPlugin<WebpackPluginInstance, any> {
  name: 'image-minimizer-webpack-plugin'
  options: Index<any>
  make(options: any): WebpackPluginInstance
}

const BudImageMinPlugin: BudImageMinPlugin = {
  name: 'image-minimizer-webpack-plugin',

  options: {
    minimizerOptions: {
      plugins: [],
    },
  },

  make: options => {
    return new ImageMinimizerPlugin(options.all())
  },

  when: ({hooks}, options) =>
    hooks.filter('build/optimization/minimize') &&
    options.isArray('minimizerOptions.plugins') &&
    options.get('minimizerOptions.plugins').length > 0,
}

export {BudImageMinPlugin}
