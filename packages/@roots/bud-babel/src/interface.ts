import '@roots/bud-api'
import '@roots/bud-framework'

declare module '@roots/bud-framework' {
  namespace Framework.Hooks.Extension {
    interface Definitions {
      '@roots/bud-babel': Framework.Module
    }
  }

  namespace Framework.Hooks.Loader {
    interface Definitions {
      babel: Framework.Hooks.Loader.Subject
    }
  }

  namespace Framework.Hooks.Item {
    interface Definitions {
      babel: Framework.Hooks.Item.Subject
    }
  }

  interface Framework {
    /**
     * ## bud.Babel
     *
     * Configure babel.
     */
    babel: Framework.Babel
  }

  namespace Framework {
    interface Babel {
      /**
       * ## babel.log
       */
      log: any

      /**
       * ## babel.hasProjectConfig
       */
      hasProjectConfig: boolean

      /**
       * ## babel.plugins
       */
      plugins: Babel.Registry

      /**
       * ## babel.presets
       */
      presets: Babel.Registry

      /**
       * ## babel.setPlugin
       *
       * Add a babel plugin.
       *
       * ### Usage
       *
       * ```js
       * bud.babel.setPlugin(MyPlugin, {plugin: 'options'})
       * ```
       */
      setPlugin: (plugin: Babel.Registrable) => this

      /**
       * ## babel.setPlugins
       */
      setPlugins(plugins: Array<[string, any?] | string>): this

      /**
       * ## babel.setPluginOptions
       */
      setPluginOptions: (plugin: string, options: any) => this

      /**
       * ## babel.setPlugin
       *
       * Add a babel plugin.
       *
       * ### Usage
       *
       * ```js
       * bud.babel.setPlugin(MyPlugin, {plugin: 'options'})
       * ```
       */
      setPreset: (preset: Babel.Registrable) => this

      /**
       * ## babel.setPresets
       */
      setPresets(presets: Array<[string, any?] | string>): this

      /**
       * ## babel.setPresetOptions
       */
      setPresetOptions: (preset: string, options: any) => this
    }

    namespace Babel {
      type Options = {
        plugins?: Plugin[]
        config?: boolean | string
      }

      type Plugin = string | [string, any] | CallableFunction

      type Registrable = string | [string, any]

      interface Registry {
        [key: string]: [string, any]
      }
    }
  }
}
