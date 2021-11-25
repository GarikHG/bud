import type {Extension} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

import {BudReactRefreshWebpackPlugin} from './react-refresh.plugin'

/**
 * Adds React support
 *
 * @remarks
 * Using babel
 *
 * @public
 */
export type BudReactExtension = Extension.Module

/**
 * Adds React support
 *
 * @remarks
 * Using babel
 *
 * @public
 */
export const BudReactExtension: BudReactExtension = {
  /**
   * {@inheritDoc @roots/bud-framework#Extension.Module.name}
   * @public
   */
  name: '@roots/bud-react',

  /**
   * {@inheritDoc @roots/bud-framework#Extension.Module.boot}
   * @public
   */
  boot: async app => {
    app.babel.setPreset(
      '@babel/preset-react',
      require.resolve('@babel/preset-react'),
    )

    if (app.isDevelopment) {
      app.hooks.on('build.entry', entryHook)
      await app.extensions.add(BudReactRefreshWebpackPlugin)
    }
  },
}

/**
 * Adds react-refresh client script to each entrypoint
 *
 * @public
 */
function addRefresh(entries, [name, entrypoint]) {
  return {
    ...(entries ?? {}),
    [name]: {
      ...entrypoint,
      import: [
        require.resolve('react-refresh/runtime'),
        ...(entrypoint.import ?? []),
      ],
    },
  }
}

/**
 * Callback for `build/entry` hook
 *
 * @public
 */
function entryHook(entry: Configuration['entry']) {
  return entry
    ? Object.entries(entry).reduce(addRefresh, entry)
    : {}
}
