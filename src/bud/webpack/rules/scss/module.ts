import {patterns} from '../util/patterns'
import {usePostCss} from '../use/usePostCss'
import {useResolveUrl} from '../use/useResolveUrl'
import {useVueStyle} from '../use/useVueStyle'
import {useCss} from '../use/useCss'
import {useScss} from '../use/useScss'
import {useMiniCss} from '../use/useMiniCss'

const module = bud => ({
  bud,

  isHot: bud.features.enabled('hot'),
  isPostCss: bud.features.enabled('postCss'),

  rule: {
    test: patterns.scssModule,
    use: [],
  },

  make: function () {
    this.bud.hooks.call('webpack.rules.module.scss.pre')

    if (this.bud.features.enabled('vue')) {
      this.rule.use.push(useVueStyle('webpack.rules.module.scss', this.bud))
    }

    this.rule.use.push(useMiniCss('webpack.rules.module.scss', this.bud))
    this.rule.use.push(useCss('webpack.rules.module.scss', this.bud, true))
    this.rule.use.push(useResolveUrl('webpack.rules.module.scss', this.bud))

    if (this.isPostCss) {
      this.rule.use.push(usePostCss('webpack.rules.module.scss', this.bud))
    }

    this.rule.use.push(useScss('webpack.rules.module.scss', this.bud))

    this.rule = this.bud.hooks.filter('webpack.rules.module.scss', this.rule)

    this.bud.logger.info(
      {name: 'webpack.rules.module.scss', value: this.rule.test.toString()},
      `webpack.rules.module.scss.test`,
    )

    this.bud.hooks.call('webpack.rules.module.scss.post')

    return this.rule
  },
})

export {module}
