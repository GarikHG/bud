import {isFunction} from 'lodash'

import {Framework} from './'

/**
 * Generic type defining the {@link Service.bindMacro} map of
 * callable function interfaces to {@link Framework} property keys
 */
interface GenericFunctionMap {
  [key: string]: CallableFunction
}

/**
 * Bind a {@link CallableFunction} to the {@link Framework}
 *
 * @example
 * Bind a function named `fooFn` to `app.foo`
 *
 * ```js
 * app.service.bindClass({foo: fooFn})
 * ```
 *
 * @remarks
 * You should also override the {@link @roots/bud-framework# | '@roots/bud-framework' module} to ensure
 * that your function typings are correctly implemented and exported.
 *
 * @typeParam FunctionMap - Map of {@link Framework} keys to {@link CallableFunction} types
 *
 * @public
 * @decorator `@bind`
 */
export function bindMethod<FunctionMap = GenericFunctionMap>(
  properties: FunctionMap,
): Framework {
  const ctx = this as Framework

  Object.entries(properties).map(([name, value]) => {
    ctx[name] = value.bind(this)
    if (isFunction(ctx[name])) {
      ctx.success(`${name} bound to ${ctx.name}`)
    }
  })

  return ctx
}
