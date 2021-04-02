import {Framework} from './'

/**
 * ## bud.cache
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export interface Cache extends Framework.Service {
  /**
   * Config
   */
  version

  /**
   * Is cache enabled?
   */
  enabled(): boolean
}
