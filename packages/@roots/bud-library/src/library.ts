import {Framework} from '@roots/bud-framework'

import {BudDllPluginConstructor} from './BudDllPlugin'

/**
 * Cache modules in a DLL
 *
 * @remarks
 * Enables dynamic link library ([DLL](https://en.wikipedia.org/wiki/Dynamic-link_library)) caching
 * of specified modules.
 *
 * @example
 * Supply {@link api.library} the module you would like to add to the DLL.
 *
 * ```js
 * app.library('jquery')
 * ```
 *
 * @example
 * Multiple modules can be added at once using an array
 *
 * ```js
 * app.library(['react', 'react-dom'])
 * ```
 *
 * @public @config @extension
 */
export interface library {
  (this: Framework, modules: string | string[]): Framework
}

export const library: library = function (modules) {
  this.extensions.enqueue(BudDllPluginConstructor(modules))

  return this
}
