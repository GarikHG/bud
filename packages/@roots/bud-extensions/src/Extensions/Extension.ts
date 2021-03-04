import {isFunction, lodash as _} from '@roots/bud-support'
import {Framework, Module} from '@roots/bud-typings'

/**
 * Extensions controller class.
 *
 * Extensions controller for the Bud framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 * [📦 @roots/bud-extensions](https://github.io/roots/bud-extensions)
 */
export default class {
  public _app: () => Framework

  public register?: Module['register']
  public boot?: Module['boot']
  public options?: Module['options']
  public api?: Module['api']
  public make?: Module['make']
  public when?: Module['when']

  public get app() {
    return this._app()
  }

  public constructor(_app: Framework['get'], extension) {
    Object.assign(this, {_app, ...extension})

    this.api && Object.assign(this.app.access(this.api))
  }

  /**
   * Register extension
   */
  public _register(): this {
    this.register && this.app.access(this.register)

    return this
  }

  /**
   * Boot extension
   */
  public _boot(): this {
    this.boot && this.app.access(this.boot)

    return this
  }

  /**
   * Make plugin.
   */
  public makePlugin(): Framework.Webpack.Plugin | null {
    if (!this.isPlugin() || !this.enabled) {
      return null
    }

    const options = this.app.access(this.options)

    return typeof this.make == 'function'
      ? this.make(
          options ? this.app.makeContainer(options) : null,
          this.app,
        )
      : this.make
  }

  /**
   * Is this extension a plugin?
   */
  public isPlugin(): boolean {
    return this.make ? true : false
  }

  public _enabled: boolean

  public get enabled() {
    if (!this.when) return true

    const options: Framework.Container = this.app.makeContainer(
      this.app.access(this.options),
    )

    if (isFunction(this.when)) {
      return this.when(this.app, options)
    }

    return this.when
  }

  public set enabled(enabled: boolean) {
    this.when = () => enabled
  }
}
