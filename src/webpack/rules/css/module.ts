import {loaders} from '../util/loaders'
import {patterns} from '../util/patterns'
import {postCss} from '../use/postCss'
import {resolveUrl} from '../use/resolveUrl'

/**
 * CSS modules
 *
 * @return {object}
 */
const module = builder => ({
  builder,
  output: {},
  test: patterns.cssModule,
  miniCss: loaders.miniCss,
  css: {
    loader: loaders.css,
    options: {
      modules: true,
      onlyLocals: false,
    },
  },
  resolveUrl: resolveUrl(builder).make(),
  postCss: postCss(builder).make(),

  /**
   * Make CSS Modules object
   */
  make: function () {
    this.pre()

    this.output = {
      test: this.test,
      use: Object.values([
        this.miniCss,
        this.css,
        this.resolveUrl,
        this.postCss,
      ]),
    }

    this.post()

    return this.output
  },

  /**
   * hook: pre_css_module
   */
  pre: function () {
    this.builder.bud.hooks.call('pre_css_module', this)
  },

  /**
   * hook: post_css_module
   */
  post: function () {
    this.builder.bud.hooks.call(
      'pre_css_module',
      this.output,
    )
  },
})

export {module}
