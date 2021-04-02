import {Sage} from './interface'
import {projectInfo} from './util'

// module export
import * as babel from '@roots/bud-babel'
import * as esbuild from '@roots/bud-esbuild'
import * as eslint from '@roots/bud-eslint'
import * as postcss from '@roots/bud-postcss'
import * as tailwind from '@roots/bud-tailwindcss'
import * as typescript from '@roots/bud-typescript'
import * as prettier from '@roots/bud-prettier'
import * as stylelint from '@roots/bud-stylelint'
import * as dependencies from '@roots/bud-wordpress-dependencies'
import * as externals from '@roots/bud-wordpress-externals'
import * as manifests from '@roots/bud-wordpress-manifests'

// default export
import react from '@roots/bud-react'
import entrypoints from '@roots/bud-entrypoints'

/**
 * Sage theme preset
 */
export const sage: Sage.Preset = sage => {
  /**
   * Pull some fns off Sage
   */
  const {env, use, isProduction} = sage

  /**
   * Project utils
   */
  const {deps, files} = projectInfo(sage)

  /**
   * Log start message
   */
  sage.logger.instance
    .scope('@roots/sage')
    .info('Building Sage preset')

  // prettier-ignore
  return sage
    /**
     * Artifacts/cache store
     */
    .when(
      !env.has('APP_STORAGE'),
      () => sage.storage('storage/bud'),
    )

    /**
     * Src path
     */
    .when(
      !env.has('APP_SRC'),
      () => sage.srcPath('resources'),
    )

    /**
     * Dist path
     */
    .when(
      !env.has('APP_DIST'),
      () => sage.distPath('public'),
    )

    /**
     * Public path
     */
    .when(
      !env.has('APP_PUBLIC_PATH'),
      () => sage.publicPath('public/'),
    )

    /**
     * Webpack path Aliases
     */
    .alias({
      '@fonts': sage.src('fonts'),
      '@images': sage.src('images'),
      '@scripts': sage.src('scripts'),
      '@styles': sage.src('styles'),
    })

    /**
     * Use relative stylesheet URL imports
     */
    .config({css: {relativeUrls: true}})

    /**
     * Disable generation of HTML template
     */
    .html({enabled: false})

    /**
     * Webpack provide
     */
    .provide({jquery: ['$', 'jQuery']})

    /**
     * Conditionally loaded extensions
     */
    .when(deps.includes('postcss'), () => use(postcss))
    .when(deps.includes('tailwindcss'), () => use(tailwind))
    .when(files.includes('.eslintrc.js'), () => use(eslint))
    .when(files.includes('.stylelintrc'), () => use(stylelint))
    .when(files.includes('.prettierrc'), () => use(prettier))

    /**
     * Transpiler and extensions
     *
     * ESBuild doesn't support HMR. it is purely a transpiler.
     *
     * - snowpack & vite each have their own HMR solutions.
     * - snowpack published [this proposal](https://git.io/JYUVM)
     * - [Related](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf)
     *
     * Losing HMR in dev is not worth the ESBuild advantages.
     * Thus, Sage uses esbuild in production, and babel in development.
     */
    .when(
      /** Check */
      isProduction,

      /** isProduction */
      () => sage
        .use(esbuild).esbuild.jsx()
        .minify()
        .hash()
        .vendor()
        .runtime('single'),

      /** isDevelopment */
      () => sage
        .use(babel)
        .when(deps.includes('typescript'), () => use(typescript))
        .when(deps.includes('react'), () => use(react))
        .proxy()
        .devtool('eval')
    )

    /**
     * Manifests
     */
    .use([entrypoints, dependencies, externals, manifests])
}
