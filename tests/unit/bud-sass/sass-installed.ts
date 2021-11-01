import {Bud, config, factory} from '@roots/bud'
import BudSassExtension from '@roots/bud-sass'

jest.setTimeout(20000)

describe('@roots/bud-sass', () => {
  let bud: Bud

  let expectedSassLoaderOptions = {
    implementation: {
      FALSE: expect.any(Object),
      NULL: expect.any(Object),
      TRUE: expect.any(Object),
      cli_pkg_main_0_: expect.any(Function),
      info: expect.stringContaining('dart-sass'),
      render: expect.any(Function),
      renderSync: expect.any(Function),
      types: expect.any(Object),
    },
    sourceMap: true,
  }

  beforeAll(async () => {
    bud = await factory({
      config: {
        ...config,
        location: {
          ...config.location,
          project: process.cwd().concat('/examples/sass'),
        },
      },
    })

    bud.use([BudSassExtension])
  })

  afterAll(done => {
    bud.close(done)
  })

  it('returns normally when sass is installed', () => {
    expect(bud.use([BudSassExtension])).toBeInstanceOf(Bud)
  })

  it('adds sass item', () => {
    expect(bud.build.items.sass.make(bud)).toMatchSnapshot({
      loader: expect.stringContaining('sass-loader/dist/cjs.js'),
      options: expectedSassLoaderOptions,
    })
  })

  it('has expected sass rule', () => {
    expect(bud.build.rules.sass.make(bud)).toMatchSnapshot({
      exclude: /\\(node_modules\\|bower_components\\)/,
      test: /\\\\\\.\\(scss\\|sass\\)\\$/,
      use: [
        {
          loader: expect.stringContaining(
            'mini-css-extract-plugin/dist/loader.js',
          ),
          options: {},
        },
        {
          loader: expect.stringContaining(
            'css-loader/dist/cjs.js',
          ),
          options: {
            importLoaders: 1,
            sourceMap: false,
          },
        },
        {
          loader: expect.stringContaining(
            'sass-loader/dist/cjs.js',
          ),
          options: expectedSassLoaderOptions,
        },
      ],
    })
  })

  it('exports and registers a bud extension', () => {
    expect(BudSassExtension).toEqual(
      bud.extensions.get('@roots/bud-sass').module,
    )
  })
})
