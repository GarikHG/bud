import {loaders} from '../util/loaders'
import {patterns} from '../util/patterns'
import {postCss} from '../use/postCss'
import {resolveUrl} from '../use/resolveUrl'
import {implementation} from './implementation'

/**
 * scss
 */
const scss = builder => ({
  builder,
  output: {},
  test: patterns.scss,
  miniCss: loaders.miniCss,
  css: loaders.css,
  resolveUrl: resolveUrl(builder).make(),
  postCss: postCss(builder).make(),
  scss: {
    loader: loaders.scss,
    options: {
      sourceMap: true,
      implementation: implementation(),
    },
  },

  /**
   * Make SCSS loaders object.
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
        this.scss,
      ]),
    }

    this.post()

    return this.output
  },

  /**
   * hook: pre_scss
   */
  pre: function () {
    this.builder.bud.hooks.call('pre_scss', this)
  },

  /**
   * hook: post_scss
   */
  post: function () {
    this.builder.bud.hooks.call('post_scss', this.output)
  },
})

export {scss}
