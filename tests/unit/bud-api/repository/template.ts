import {Bud, factory} from '@roots/bud'

describe.skip('bud.template', function () {
  describe('default', () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory({
        config: {features: {dashboard: false, log: false}},
      })
    })

    afterAll(done => {
      bud.close(done)
    })

    it('is a function', () => {
      expect(bud.template).toBeInstanceOf(Function)
    })

    it('html feature flag off', () => {
      expect(bud.store.get('html')).toBe(false)
    })

    it('has expected default options', () => {
      expect(
        bud.store.get('extension.html-webpack-plugin'),
      ).toEqual({
        alwaysWriteToDisk: true,
        inject: true,
        minify: {
          collapseWhitespace: false,
          keepClosingSlash: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      })
    })

    it('html-webpack-plugin not set', () => {
      expect(bud.extensions.has('html-webpack-plugin')).toBe(
        false,
      )
    })

    it('interpolate-html-plugin not set', () => {
      expect(bud.extensions.has('interpolate-html-plugin')).toBe(
        false,
      )
    })
  })

  describe('called', () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory({
        config: {features: {dashboard: false, log: false}},
      })
      bud.extensions.remove('html-webpack-plugin')
      bud.store.set('html', false)
    })

    afterAll(done => {
      bud.close(done)
    })

    it('returns bud', () => {
      expect(bud.template()).toBeInstanceOf(Bud)
    })

    it('adds html webpack plugin', () => {
      bud.template()

      expect(bud.extensions.has('html-webpack-plugin')).toEqual(
        true,
      )
    })

    it('adds interpolate-html-plugint', () => {
      expect(bud.extensions.has('interpolate-html-plugin')).toBe(
        true,
      )
    })

    it('enables html feature flag', () => {
      bud.template()
      expect(bud.store.is('html', true)).toEqual(true)
    })
  })

  describe('called with options', () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory({
        config: {features: {dashboard: false, log: false}},
      })
    })

    afterAll(done => {
      bud.close(done)
    })

    it('does not register plugin when explicitly disabled', () => {
      bud.template(false)
      expect(bud.store.is('html', false)).toEqual(true)
    })

    it('changes the template when template options is passed', () => {
      bud.template({template: 'src/foo.html'})

      expect(
        bud.extensions
          .get('html-webpack-plugin')
          .options.get('template'),
      ).toBe('src/foo.html')
    })

    it('has expected options after changes', async () => {
      bud.template({template: 'src/foo.html'})
      expect(
        bud.extensions.get('html-webpack-plugin').options,
      ).toEqual({
        alwaysWriteToDisk: true,
        inject: true,
        minify: {
          collapseWhitespace: false,
          keepClosingSlash: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
        publicPath: '',
        template: 'src/foo.html',
        window: {
          env: {},
        },
      })
    })

    it('has expected options after changes', () => {
      bud.template({
        replace: {
          foo: 'bar',
        },
      })

      expect(
        bud.extensions
          .get('interpolate-html-plugin')
          .options.all(),
      ).toEqual({
        foo: 'bar',
      })
    })
  })
})
