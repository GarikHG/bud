import {Webpack, isUndefined} from '@roots/bud-support'
import {Module} from '@roots/bud-typings'
import Extension from './Extension'
import Service from './Service'

/**
 * ## bud.extensions
 *
 * Extensions controller for the Bud framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://github.com/roots/bud/blob/stable/README.md)
 */
export default class extends Service {
  /**
   * Service ident.
   */
  public name = '@roots/bud-extensions'

  /**
   * Service register.
   */
  public register(): void {
    this.boot = this.boot.bind(this)
    this.add = this.add.bind(this)
    this.use = this.use.bind(this)
    this.make = this.make.bind(this)
    this.discard = this.discard.bind(this)
  }

  /**
   * Service boot
   */
  public boot(): void {
    this.every((name: string, extension: Module) => {
      return this.add(name, extension)
    })
  }

  /**
   * Add an extension
   */
  public add(name: string, extension: Module): void {
    this.log(`Adding extension: %s`, extension.name)

    this.set(
      name,
      new Extension(this.app, extension).register().boot(),
    )
  }

  /**
   * Make all extensions.
   *
   * Returns a webpack-ready array
   */
  public make(): Webpack.Plugin[] {
    const plugins = this.getKeys()
      .map(name => this.get(name).make())
      .filter(ext => !isUndefined(ext)) as Webpack.Plugin[]

    return plugins
  }

  /**
   * Register an extension from a pkg name
   */
  public use(pkg: string): this {
    const path = require.resolve(pkg)

    this.app.disk.make(pkg, {
      baseDir: path,
    })

    this.add(pkg, require(path))

    return this
  }

  /**
   * Discard a registered extension
   */
  public discard(pkg: string): Service['app'] {
    this.remove(pkg)
    this.app.disk.remove(pkg)

    return this.app
  }
}
