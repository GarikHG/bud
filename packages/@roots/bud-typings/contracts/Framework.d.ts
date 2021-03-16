import {
  Api,
  Build,
  Cache,
  Dashboard,
  CLI,
  Compiler,
  Constructor,
  Container,
  Dependencies,
  Discovery,
  Env,
  Express,
  Extensions,
  Extension,
  Factory,
  Disk,
  Fluent,
  GlobTask,
  Module,
  Hooks,
  Index,
  Item,
  Loader,
  Logger,
  MaybeCallable,
  Providers,
  Rule,
  Server,
  Service,
  Store,
  Webpack,
} from './'

/**
 * # Bud Framework
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/framework](#)
 * [📦 @roots/bud-framework](https://www.npmjs.com/package/@roots/bud-framework)
 */
export declare interface Framework extends Mode {
  name: string

  /**
   * ## bud.store [🍱 _Container_]
   *
   * Meta container for configs, data, etc.
   *
   * [🔗 Documentation on bud.config](#)
   * [🔗 Documentation on containers](#)
   */
  store: Framework.Store

  /**
   * ## bud.build
   *
   * Webpack configuration builder class. [🔗 Documentation](#)
   */
  build: Framework.Build

  /**
   * CLI
   */
  cli: Framework.CLI

  /**
   * ## bud.compiler
   */
  compiler: Framework.Compiler

  /**
   * ## bud.dashboard
   *
   * The CLI interface.
   */
  dashboard: Framework.Dashboard

  /**
   * ## bud.dependencies
   *
   * Install or uninstall dependencies
   */
  dependencies: Framework.Dependencies

  /**
   * ## bud.disk
   *
   * Index of virtual filesystems. Allows for swapping
   * "disks".
   *
   * ### Usage
   *
   * #### List file contents of project
   *
   * ```js
   * bud.disk.get('project').ls()
   * ```
   *
   * #### Get the absolute path of Framework class.
   *
   * ```js
   * bud.disk.get(`@roots`).get('bud-framework/src/Bud/index.js')
   * ```
   */
  disk: Framework.Disk

  /**
   * ## bud.env [🍱 _Container_]
   *
   * Container for definitions founds in the
   * application `.env` file *
   *
   * - [🔗 Documentation](#)
   *
   * ### Usage
   * ```js
   * bud.env.get('APP_NAME')
   * ```
   */
  env: Framework.Env

  /**
   * ## bud.extensions
   *
   * Bud extension controller class.
   *
   * - [🔗 Documentation](#)
   */
  extensions: Framework.Extensions

  /**
   * ## bud.hooks
   *
   * Bud provides a system of 'hooks' to expose values
   * for easier modification.
   *
   * - [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ####  Add a new entry to the `webpack.externals` configuration:
   *
   * ```js
   * bud.hooks.on(
   *   'webpack.externals',
   *   externals => ({
   *     ...externals,
   *     $: 'jquery',
   *   }),
   * )
   * ```
   *
   * #### Change the `webpack.output.filename` format:
   *
   * ```js
   * bud.hooks.on(
   *   'webpack.output.filename',
   *   () => '[name].[hash:4]',
   * )
   * ```
   *
   * #### Replace the regular expression used for CSS modules:
   *
   * ```js
   * bud.hooks.on(
   *   'webpack.module.rules.oneOf.css.test',
   *   () => /\.css$/,
   * )
   * ```
   */
  hooks: Framework.Hooks

  /**
   * ## logger
   *
   * Logging utility
   */
  logger: Framework.Logger

  /**
   * ## server
   *
   * Express application server used for development.
   */
  server: Framework.Server

  /**
   * ## services
   */
  services: Container<any>

  /**
   * ## discovery
   */
  discovery: Discovery

  boot(cli?: Framework.CLI)

  /**
   * ## get
   *
   * ```js
   * bud.get()
   * ```
   */
  get<I = any>(service?: string | number): I

  /**
   * ## access
   *
   * If a value is a function it will call that
   * function and return the result.
   *
   * If the value is not a function it will return its value.
   *
   * ```js
   * const isAFunction = (option) => `option value: ${option}`
   * const isAValue = 'option value: true'
   *
   * bud.access(isAFunction, true)
   * // => `option value: true`
   *
   * bud.access(isAValue)
   * // => `option value: true`
   * ```
   */
  access<T = any>(value: T | ((app: Framework) => T)): T

  /**
   * Topics
   */
  topics(topics: string[], caller?: string)

  /**
   * Subscriptions
   */
  subscribe(name: string | string[], caller?: string)

  /**
   * Publish
   */
  publish<T = any>(pubs: {[key: string]: any}, caller?: string)

  /**
   * ## bud.makeContainer
   *
   * Create a new container. May be passed an initial set of values.
   *
   * [🔗 Documentation on containers](#)
   */
  makeContainer(repository?: any): Container

  /**
   * ## bud.pipe [💁 Fluent]
   *
   * Execute an array of functions. The first is passed the
   * bud object Each will be the result of
   * the one preceeding it.
   *
   * Returns the final result.
   *
   * ### Usage
   *
   * ```js
   * bud.pipe([
   *   bud => bud.srcPath('resources'),
   *   bud => bud.proxy(),
   * ])
   * ```
   */
  pipe<V = any, R = any>(fns: CallableFunction[], value: V): R

  /**
   * ## bud.sequence [💁 Fluent]
   *
   * Execute an array of functions. Each will be passed
   * bud.
   *
   * Returns the final result.
   *
   * ### Usage
   *
   * ```js
   * bud.sequence([
   *   bud => ,
   *   bud => bud.proxy(),
   * ])
   * ```
   */
  sequence(fns: CallableFunction[]): this

  /**
   * ## bud.run
   *
   * Finalize configuration and run build. No configuration changes
   * can be made after this point.
   *
   * ### Usage
   *
   * ```js
   * bud.run()
   * ```
   */
  run(): unknown

  /**
   * ## bud.use [💁 Fluent]
   *
   * Register an extension or set of extensions [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.use(['@roots/bud-babel', '@roots/bud-react'])
   * ```
   */
  use(source: Module | Module[]): Framework

  /**
   * ## bud.when  [💁 Fluent]
   *
   * Executes a function if a given test is `true`.
   *
   * - The first parameter is the conditional check.
   *     - It can be a boolean statement (app.inDevelopment)
   *     - It can be a fn, which is passed the app and returns the boolean
   *
   * - The second parameter is the function to be run if `true`.
   *
   * - The third paramter is optional; ran if not `true`.
   *
   * ### Usage
   *
   * ```js
   * bud.when(bud.mode.is('production'), () => bud.vendor())
   * ```
   */
  when(
    test: boolean | ((app: Framework) => boolean),
    isTrue: (app: Framework) => unknown,
    isFalse?: (app: Framework) => unknown,
  ): Framework
}

declare interface Mode {
  /**
   * ## bud.mode
   *
   * Get and set webpack compilation mode
   */
  mode: Webpack.Configuration['mode']

  /**
   * ## bud.isProduction
   *
   * True if Webpack.Configuration['mode'] is 'production'
   */
  readonly isProduction: boolean

  /**
   * ## bud.isDevelopment
   *
   * True if Webpack.Configuration['mode'] is 'development'
   */
  readonly isDevelopment: boolean
}

/**
 * Keys
 */
declare interface ServiceKeys {
  [key: string]: any

  /**
   * ## bud.args [🍱 _Container_]
   *
   * CLI arguments passed to Bud.
   *
   * [🔗 Documentation on bud.args](#)
   * [🔗 Documentation on containers](#)
   *
   * ### Usage
   *
   * #### Flags
   *
   * ```sh
   * $ bud build --html
   * ```
   *
   * ```js
   * bud.args.has('html') // => true
   * ```
   *
   * #### Values
   *
   * ```sh
   * $ bud build --html dist/index.html
   * ```
   *
   * ```js
   * bud.args.get('html') // => 'dist/index.html'
   * ```
   *
   * #### Arrayed
   *
   * ```sh
   * $ bud build --bento uni rainbow edamame
   * # or
   * $ bud build --bento uni --bento rainbow --bento edamame
   * ```
   *
   * ```js
   * bud.args.get('bento') // => ['uni', 'rainbow', 'edamame']
   * ```
   */
  args: Framework.Index<string | boolean | unknown>

  /**
   * ## bud.config [🍱 _Container_]
   */
  webpack: Framework.Webpack.Configuration

  /**
   * ## bud.features [🍱 _Container_]
   *
   * Collection of feature flags each indicating
   * whether or not a  particular feature
   * is enabled or disabled.
   *
   * [🔗 Documentation on bud.features](#)
   * [🔗 Documentation on containers](#)
   *
   * ### Usage
   *
   * **Get the features store**
   *
   * ```js
   * bud.features.all() // returns all the features as a `k => v` obj.
   * ```
   *
   * **Check if a given feature is enabled**
   *
   * ```js
   * bud.features.enabled('minify') // `true` if `minify` flag is on
   * ```
   *
   * **Toggle a feature**
   *
   * ```js
   * bud.features.set('gzip', false) // disable `gzip` feature flag
   * ```
   */
  features: Framework.Index<boolean>

  /**
   * ## bud.patterns [🍱 _Container_]
   *
   * Collection of common RegExp objects.
   *
   * The advantage of using them in
   * a container object is that they can be
   * easily redefined by extensions.
   *
   * - [🔗 Documentation on bud.patterns](#)
   * - [🔗 Documentation on containers](#)
   *
   * ### Usage
   *
   * **Get a regular expression matching files with `.js` extension**
   *
   * ```js
   * bud.patterns.get('js')
   * ```
   *
   * **Redefine a regular expression**
   *
   * ```js
   * bud.patterns.set('cssModule', /\.module\.css$/)
   * ```
   */
  patterns: Framework.Index<RegExp>

  /**
   * ## Server config repository
   */
  server: Framework.Server.Options
}

export declare namespace Framework {
  export {Api}
  export {Build}
  export {Cache}
  export {Dashboard}
  export {CLI}
  export {Compiler}
  export {Container}
  export {Discovery}
  export {Dependencies}
  export {Disk}
  export {Env}
  export {Extensions, Extension}
  export {Item}
  export {Module}
  export {Hooks}
  export {Loader}
  export {Logger}
  export {Providers}
  export {Rule}
  export {Server}
  export {Service}
  export {ServiceKeys}
  export {Store}
  export {
    Constructor,
    Express,
    Factory,
    Fluent,
    GlobTask,
    Index,
    MaybeCallable,
    Webpack,
  }
}
