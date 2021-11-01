import {factory, Framework} from '@roots/bud'

describe('webpack.resolve.alias', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({config: {ci: true, log: false}})
  })

  afterAll(done => {
    bud.close(done)
  })

  it('is a function', () => {
    expect(bud.alias).toBeInstanceOf(Function)
  })

  it('is configurable by bud.alias', () => {
    bud.alias({'@foo': 'bar'}).build.make()

    expect(bud.build.config.resolve.alias).toEqual({
      '@foo': bud.path('project', 'bar'),
    })
  })
})
