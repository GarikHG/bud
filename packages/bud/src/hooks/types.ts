import type {Bud} from '..'
export type {Bud}

export type HooksConstructor = (bud: Bud) => Hooks

/**
 * ## bud.hooks
 */
export type Hooks = {
  /**
   * ## bud.logger
   */
  logger: Bud['logger']

  /**
   * ## bud.hooks.registered
   *
   * Registered hooks.
   */
  registered: RegisteredHooks

  /**
   * ## bud.hooks.make
   *
   * Makes a new hook.
   */
  make: (any) => any

  /**
   * ## bud.hooks.getAll
   *
   * Returns an array of all registered hooks.
   */
  entries: () => any[]

  /**
   * ## bud.hooks.on
   *
   * Register a function to be called with a hook.
   */
  on: (name: string, callback: (any) => any) => void

  /**
   * ## bud.hooks.filter
   *
   * Filter values and functions.
   */
  filter: (name: string, value: any) => any
}

export type RegisteredHooks = {
  [name: string]: Hook[]
}

export type Hook = {
  fn: () => any
  fired: boolean
}
