/**
 * Enable or disable filename hashing of built assets. Unless specified, filename hashes will be created when running production builds.
 * @example bud.hash(true) // enable
 * @param   {boolean} enabled - true to enable filename hashing.
 * @return  {typeof import('./../index')} bud
 */
export function hash(enabled?: boolean): typeof import('./../index');
