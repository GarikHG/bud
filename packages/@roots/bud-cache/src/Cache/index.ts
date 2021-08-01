/**
 * @module @roots/bud-cache
 */

import {
  Cache as Contract,
  Framework,
  Service,
} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {createHash} from 'crypto'
import {mkdirSync, pathExistsSync, readFileSync} from 'fs-extra'
import {sync as globbySync} from 'globby'

/**
 * @class Cache
 */
class Cache extends Service implements Contract {
  public name = 'cache'

  @bind
  public register(app: Framework): void {
    app.hooks
      .on('build/cache', () => ({
        type: app.hooks.filter('build/cache/type'),
      }))
      .hooks.on('build/cache/type', () => 'memory')
  }

  @bind
  public booted(): void {
    this.app.hooks.filter('build/cache/type') == 'filesystem' &&
      !pathExistsSync(this.app.path('storage')) &&
      mkdirSync(this.app.path('storage'))
  }

  @bind
  public version(): string {
    const version = createHash('sha1')
      .update(this.hash())
      .digest('base64')
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase()

    return version
  }

  @bind
  public directory(): string {
    return this.app.path('storage', 'cache')
  }

  @bind
  public buildDependencies(): string[] {
    return [
      ...new Set(
        globbySync([
          this.app.path(
            'project',
            `${this.app.name}.{js,ts,yml,json}`,
          ),
          this.app.path(
            'project',
            `${this.app.name}.config.{js,ts,yml,json}`,
          ),
          this.app.path(
            'project',
            `${this.app.name}.${this.app.mode}.{js,ts.yml,json}`,
          ),
          ...(this.app.discovery?.resolveFrom?.map(
            dep => `${dep}/lib/cjs/index.js`,
          ) ??
            this.app.parent?.discovery?.resolveFrom?.map(
              dep => `${dep}/lib/cjs/index.js`,
            ) ??
            []),
          this.app.path('storage', 'cache/*'),
        ]),
      ),
    ]
  }

  @bind
  public hash(): string {
    return JSON.stringify(
      this.buildDependencies().reduce(
        (all, file) => all.concat(readFileSync(file, 'utf8')),
        process.argv.slice(3).join(''),
      ) ?? '{}',
    )
  }
}

/**
 * @exports Cache
 */
export {Cache}
