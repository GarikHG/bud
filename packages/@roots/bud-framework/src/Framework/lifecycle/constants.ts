/**
 * Service lifecycle events
 *
 * @public
 */
export const LIFECYCLE_EVENTS = [
  'bootstrap',
  'bootstrapped',
  'register',
  'registered',
  'boot',
  'booted',
]

/**
 * Services which are only instantiated in the parent compiler context.
 *
 * @public
 */
export const PARENT_SERVICES: (string | number)[] = [
  'compiler',
  'dashboard',
  'server',
]

/**
 * Services which are only instantiated in development
 *
 * @public
 */
export const DEVELOPMENT_SERVICES: (string | number)[] = [
  'server',
]
