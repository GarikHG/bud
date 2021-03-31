import {Framework} from '@roots/bud-framework'
import Plugin from 'compression-webpack-plugin'
import * as api from './api'

export const name: Framework.Module['name'] =
  'compression-webpack-plugin-brotli'

export const options: Framework.Module['options'] = {
  filename: '[name].br[query]',
  algorithm: 'brotliCompress',
  test: /\.js$|\.css$|\.html$|\.htm$/,
  compressionOptions: {
    level: 11,
  },
  threshold: 10240,
  minRatio: 0.8,
  deleteOriginalAssets: false,
}

export const make: Framework.Module.Make = options =>
  new Plugin(options.all())

export const when: Framework.Module.Make = ({store}) =>
  store.enabled('options.brotli')

export {api}
