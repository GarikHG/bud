import {factory, Framework} from '@roots/bud'

describe.skip('bud.hash', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({config: {ci: true, log: false}})
  })

  it('is a function', () => {
    expect(bud.hash).toBeInstanceOf(Function)
  })

  it('enables hashing when called', () => {
    bud.hash().build.make()

    expect(bud.build.config.output.filename).toEqual(
      '[name].[contenthash:6].js',
    )
  })
})
