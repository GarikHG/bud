import './interface'

import {Module} from '@roots/bud-framework'
import {VueLoaderPlugin} from 'vue-loader'
import {Configuration} from 'webpack'

const vueExtension: Module = {
  name: '@roots/bud-vue',

  boot: app => {
    const {project, extensions, store, hooks} = app
    if (
      !project.hasPeerDependency('vue') ||
      !project.hasPeerDependency('@vue/compiler-sfc')
    )
      return

    hooks.on(
      'build/module/rules',
      (rules: Configuration['module']['rules']) => [
        {
          test: store.get('patterns.vue'),
          use: [{loader: require.resolve('vue-loader')}],
        },
        ...rules,
      ],
    )

    extensions.add({
      name: 'vue-loader-plugin',
      make: () => new VueLoaderPlugin(),
    })

    hooks.on(
      'build/resolve/alias',
      (aliases: Configuration['resolve']['alias']) => ({
        ...aliases,
        vue: '@vue/runtime-dom',
      }),
    )

    hooks.on(
      'build/resolve/extensions',
      (extensions: Configuration['resolve']['extensions']) => [
        ...extensions,
        '.vue',
      ],
    )
  },
}

export {vueExtension, vueExtension as default}

export const {name, boot} = vueExtension
