import type {Framework} from '@roots/bud-framework'

/**
 * Wrapper function for {@link webpack#ProvidePlugin}.
 *
 * @public @config
 */
interface provide {
  (packages?: Record<string, Array<string>>): Framework
}

/**
 * Make a variable/module available throughout the entire
 * application without needing to import it explicitly.
 *
 * @example
 * ```js
 * bud.provide({
 *   jquery: '$',
 * })
 * ```
 *
 * @public @config
 */
const provide: provide = function (
  packages: Record<string, Array<string>>,
) {
  const ctx = this as Framework

  const plugin = ctx.extensions.get('webpack-provide-plugin')

  Object.entries(packages).forEach(([k, v]) => {
    v.forEach(alias => {
      plugin.options.set(alias, k)
    })
  })

  return ctx
}

export {provide as default}
