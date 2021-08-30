import type {WebpackPlugin} from '@roots/bud-framework'
import {Container} from '@roots/container'
import {DefinePlugin} from 'webpack'

interface BudWebpackDefinePlugin
  extends WebpackPlugin<DefinePlugin, Options> {
  name: 'webpack-define-plugin' & WebpackPlugin['name']
  make: (options: Container<Options>) => DefinePlugin
}

interface Options {
  definitions: DefinePlugin['definitions']
}

const name: BudWebpackDefinePlugin['name'] =
  'webpack-define-plugin'

const make: BudWebpackDefinePlugin['make'] = options =>
  new DefinePlugin(options.all())

const when: BudWebpackDefinePlugin['when'] = (_, opts) =>
  opts.getEntries()?.length > 0

const options: BudWebpackDefinePlugin['options'] = ({
  env,
  store,
}) => {
  /**
   * .env values which contain PUBLIC
   */
  const fromEnv = env
    .getEntries()
    .filter(([k]: [string, string]) => k.includes('APP_PUBLIC'))
    .reduce((a, [k, v]) => ({...a, [k]: JSON.stringify(v)}), {})

  const fromStore = store.get('extension.webpackDefinePlugin')

  return {
    ...fromEnv,
    ...fromStore,
  }
}

export {name, make, when, options}
