import {bind} from '@roots/bud-support'
import {remove} from 'fs-extra'

import {Bud} from '../../Bud'
import {config} from '../../config'
import {factory} from '../../factory'
import {isFunction} from '../cli.dependencies'
import CLIConfig from '../Config'

/**
 * @internal
 */
export class Runner {
  /**
   * @internal
   */
  public _fluentBuilders: string[]

  /**
   * @internal
   */
  public _fluentBuildersByEnv: string[]

  /**
   * @internal
   */
  public _staticBuilders: string[]

  /**
   * @internal
   */
  public _staticBuildersByEnv: string[]

  /**
   * {@link Bud} application instance
   */
  public app: Bud

  /**
   * Constructor options
   */
  public options: {
    mode?: 'production' | 'development'
    config?: Partial<typeof config>
  }

  /**
   * CLI state
   */
  public flags: {[key: string]: any}
  public args: {[key: string]: any}

  /**
   * Requested {@link Bud.mode}
   */
  public mode: 'development' | 'production'

  /**
   * Fluent builders
   *
   * @example `bud.config.{js,ts}`
   */
  public get fluentBuilders(): string[] {
    return this._fluentBuilders
  }
  public set fluentBuilders(builders: string[]) {
    this._fluentBuilders = builders
  }

  /**
   * Fluent builders by env
   *
   * @example `bud.development.{js,ts}`
   */
  public get fluentBuildersByEnv(): string[] {
    return this._fluentBuildersByEnv
  }
  public set fluentBuildersByEnv(builders: string[]) {
    this._fluentBuildersByEnv = builders
  }

  /**
   * Static builders
   *
   * @example `bud.config.{json,yml}`
   */
  public get staticBuilders(): string[] {
    return this._staticBuilders
  }
  public set staticBuilders(builders: string[]) {
    this._staticBuilders = builders
  }

  /**
   * Static builders by env
   *
   * @example `bud.development.{json,yml}`
   */
  public get staticBuildersByEnv(): string[] {
    return this._staticBuildersByEnv
  }
  public set staticBuildersByEnv(builders: string[]) {
    this._staticBuildersByEnv = builders
  }

  public cli: {
    args: Record<string, any>
    argv: Array<string>
    flags: Record<string, any>
    raw: Array<Record<string, string>>
    metadata: Record<string, Record<string, any>>
  }

  /**
   * Class constructor
   *
   * @param cli - CLI state
   * @param options - Bud options
   * @param app - Instance of {@link Bud}
   */
  public constructor(
    cli: {
      args: Record<string, any>
      argv: Array<string>
      flags: Record<string, any>
      raw: Array<Record<string, string>>
      metadata: Record<string, Record<string, any>>
    },
    options: Runner['options'] = {},
  ) {
    Object.assign(this, {...cli})
    options && Object.assign(this, options)
  }

  public async initialize() {
    this.app = await factory({
      mode: this.mode,
      ...this.options,
      config: {
        ...config,
        ci: this.flags?.ci ?? false,
        discover: this.flags?.discover ?? false,
        install: this.flags?.install ?? false,
        cache: this.flags?.cache !== 'false',
        ...(this.options?.config ?? {}),
      },
    })
  }

  /**
   * Main process
   *
   * @param build - Boolean value indicating if compilation should occur
   */
  @bind
  public async make() {
    if (this.flags.clearCache === true) {
      remove(this.app.path('storage').concat('bud.cache.json'))
    }

    /**
     * Handle --clean flag
     */
    if (typeof this.flags.clean !== 'undefined') {
      this.app.store.set('clean', this.flags.clean)
    }

    /**
     * Configure bud instance with static configs.
     */
    await this.doStatics()
    /**
     * Configure bud instance with fluent configs.
     */
    await this.doBuilders()

    /**
     * Handle --src flag
     */
    if (typeof this.flags.src !== 'undefined') {
      this.app.setPath('src', this.flags.src)
      this.app.children.every((_name, child) =>
        child.setPath('src', this.flags.src),
      )
    }

    /**
     * Handle --dist flag
     */
    if (typeof this.flags.dist !== 'undefined') {
      this.app.setPath('dist', this.flags.dist)
      this.app.children.every((_name, child) =>
        child.setPath('dist', this.flags.dist),
      )
    }

    /**
     * Handle --publicPath flag
     */
    if (typeof this.flags.publicPath !== 'undefined') {
      this.app.setPublicPath(this.flags.publicPath)
      this.app.children.every((_name, child) =>
        child.setPublicPath(this.flags.publicPath),
      )
    }

    /**
     * Handle --cache flag
     */
    if (typeof this.flags.cache !== 'undefined') {
      this.app.persist(this.flags.cache)
      this.app.children.every((_name, child) =>
        child.persist(this.flags.cache),
      )
    }

    /**
     * Handle --devtool flag
     */
    if (typeof this.flags.devtool !== 'undefined') {
      this.app.devtool(this.flags.devtool)
      this.app.children.every((_name, child) =>
        child.devtool(this.flags.devtool),
      )
    }

    /**
     * Handle --devtool flag
     */
    if (typeof this.flags.hash !== 'undefined') {
      this.app.hash(this.flags.hash)
      this.app.children.every((_name, child) =>
        child.hash(this.flags.hash),
      )
    }

    /**
     * Handle --runtime flag
     */
    if (typeof this.flags.runtime !== 'undefined') {
      this.app.runtime(this.flags.runtime)
      this.app.children.every((_name, child) =>
        child.runtime(this.flags.runtime),
      )
    }

    /**
     * Handle --manifest flag
     */
    if (typeof this.flags.manifest !== 'undefined') {
      this.app.store.set('manifest', this.flags.manifest)
      this.app.children.every((_name, child) =>
        child.store.set('manifest', this.flags.manifest),
      )
    }

    /**
     * Handle --minimize flag
     */
    if (typeof this.flags.minimize !== 'undefined') {
      this.app.minimize(this.flags.minimize)
      this.app.children.every((_name, child) => {
        child.minimize(this.flags.minimize)
      })
    }

    /**
     * Handle --minimize flag
     */
    if (typeof this.flags.vendor !== 'undefined') {
      this.app.splitChunks(this.flags.vendor)
      this.app.children.every((_name, child) => {
        child.splitChunks(this.flags.vendor)
      })
    }

    /**
     * Handle --target flag
     *
     * @example `$ bud build --target plugin`
     */
    if (this.flags.target.length > 0) {
      /**
       * Handle parent if applicable
       */
      !this.flags?.target?.includes('bud') &&
        this.app.hooks.on('build/entry', false)

      /**
       * And children if applicable
       */
      this.app.children.getKeys().forEach(name => {
        !this.flags?.target?.includes(name) &&
          this.app.children.remove(name)
      })
    }

    return this.app
  }

  /**
   * Set process.env based on app mode
   *
   * @param env - {@link Bud.mode}
   */
  @bind
  public setEnv(env: 'production' | 'development') {
    process.env.BABEL_ENV = env
    process.env.NODE_ENV = env
  }

  /**
   * Process dynamic configs
   */
  @bind
  public async doBuilders() {
    if (!this.app.project.get('configFiles.dynamic')) return

    const builder = await new CLIConfig(
      this.app,
      this.app.project.get('configFiles.dynamic'),
    ).get()

    isFunction(builder) && builder(this.app)
  }

  /**
   * Process static configs
   */
  @bind
  public async doStatics() {
    if (!this.app.project.has('configFiles.static')) return

    await new CLIConfig(
      this.app,
      this.app.project.get('configFiles.static'),
    ).apply()
  }
}
