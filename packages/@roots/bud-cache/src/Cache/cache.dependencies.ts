export * as Bud from '@roots/bud-framework'
export {bind, globby} from '@roots/bud-support'
export {createHash} from 'crypto'

import {fs} from '@roots/bud-support'
export const {
  existsSync,
  ensureFileSync,
  readFileSync,
  readJsonSync,
  removeSync,
  writeJsonSync,
  writeFileSync,
} = fs
