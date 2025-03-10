import {Bud, factory} from '@roots/bud'
import {Extensions} from '@roots/bud-extensions'
import {
  Extension,
  Framework,
  Modules,
} from '@roots/bud-framework'
import {WebpackPluginInstance} from 'webpack'

describe.skip('Extensions', function () {
  let bud: Bud = null

  let mockWebpackPlugin: WebpackPluginInstance = {
    apply: jest.fn(),
  }

  let options = {
    test: 'foo',
  }

  let mockModule: Extension.Module = {
    name: '@roots/bud-postcss',
    register: jest.fn(() => null),
    boot: jest.fn(() => null),
    api: jest.fn(() => ({
      foo: jest.fn(function (this: Framework) {
        return this
      }),
    })),
    options: jest.fn(() => options),
    make: jest.fn(() => mockWebpackPlugin),
    when: jest.fn(() => true),
  }

  beforeAll(async () => {
    bud = await factory()
  })

  it('is constructable', () => {
    const extensions: Extensions = new Extensions(bud)
    expect(extensions).toBeInstanceOf(Extensions)
  })

  it('add fn registers a module', () => {
    const extensions: Extensions = new Extensions(bud)
    extensions.repository = {} as Modules

    extensions.add(mockModule)

    expect(extensions.get(mockModule.name).module).toBe(
      mockModule,
    )
  })
})
