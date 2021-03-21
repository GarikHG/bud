import Service from './Service'
import options from './options'
import {webpack, ProgressPlugin} from '@roots/bud-support'
import type {Compiler, Webpack} from '@roots/bud-typings'

/**
 * Compiler
 */
export default class extends Service implements Compiler {
  /**
   * Service ident.
   */
  public name = 'compiler'

  /**
   * Compiler instance
   */
  public _instance: Webpack.Compiler

  /**
   * Stats options
   */
  public statsOptions: Compiler.Stats.Options = options

  /**
   * Stats
   */
  public stats: Compiler.Stats.Output

  /**
   * Errors
   */
  public errors: string[]

  /**
   * Progress
   */
  public progress: Compiler.Progress

  /**
   * Register service.
   */
  public register(): void {
    this.run = this.run.bind(this)
    this.compile = this.compile.bind(this)
    this.applyPlugins = this.applyPlugins.bind(this)
  }

  /**
   * Compiler accessors.
   */
  public get compiler(): Webpack.Compiler {
    return this._instance
  }
  public set compiler(compiler: Webpack.Compiler) {
    this._instance = compiler
  }

  /**
   * Compile
   */
  public compile(conf): Webpack.Compiler {
    return (this.instance = webpack(conf))
  }

  /**
   * Run compilation
   */
  public run(): void {
    this.instance.run((_err, stats) => {
      this.stats = {
        string: stats.toString(),
        json: stats.toJson(),
      }
    })
  }

  /**
   * Make error
   */
  public makeError(err: string): void {
    this.error({err})
    new Error(err)
  }

  /**
   * Apply plugins to compilation
   */
  public applyPlugins(handler: Compiler.ProgressHandler): void {
    new ProgressPlugin(handler).apply(this.instance)
  }
}
