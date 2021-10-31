import {factory, Framework} from '@roots/bud'

describe('bud.config', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory()
  })

  afterAll(done => {
    bud.close(done)
  })

  it('is a function', () => {
    expect(bud.define).toBeInstanceOf(Function)
  })

  it('modifies bud.store', () => {
    bud.define({foo: 'bar'})

    expect(
      bud.extensions.get('webpack-define-plugin').options.all(),
    ).toEqual({foo: 'bar'})
  })
})
