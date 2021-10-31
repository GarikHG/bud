import type {Framework} from '@roots/bud-framework'

export interface hash {
  (this: Framework, enabled?: boolean): Framework
}

/**
 * Enable filename hashing of built assets.
 *
 * @example
 * ```js
 * bud.hash()
 * ```
 *
 * @public
 */
export const hash: hash = function (enabled = true) {
  this.info(
    `file hashing is ${enabled ? 'enabled' : 'disabled'}`,
  )

  this.store.set('hash', enabled)
  return this
}
