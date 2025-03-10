import {spawnSync} from 'child_process'

import {IDependencyManager} from './'
import {Npm} from './command'
import {Yarn} from './command'

export class Dependencies {
  /**
   * @public
   */
  public constructor(public path: string = process.cwd()) {}

  /**
   * @public
   */
  public get client(): IDependencyManager {
    if (this.isYarn()) {
      return new Yarn(this.path)
    }

    return new Npm(this.path)
  }

  /**
   * @public
   */
  public isYarn(): boolean {
    try {
      // user could have yarn installed, but not be using it
      // this will return false if the user isn't actually using yarn
      if (
        !process.env.npm_execpath ||
        process.env.npm_execpath.indexOf('yarn') === -1
      ) {
        return false
      }
      // test to be sure yarn can be spawned
      spawnSync('command -v yarn >/dev/null')
      return true
    } catch (e) {}

    return false
  }
}
