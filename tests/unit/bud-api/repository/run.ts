import {factory} from '@roots/bud'
import {Repository} from '@roots/bud-api'

process.env.BUD_KEEP_ALIVE = 'true'

describe('bud.run', function () {
  let run
  let bud
  let mockCompileRunFn
  let mockCompileFn
  let MOCK_BUD

  beforeAll(() => {
    run = Repository.run

    bud = factory()

    mockCompileRunFn = jest.fn()
    mockCompileFn = jest.fn(() => {
      return {
        run: mockCompileRunFn,
      }
    })

    MOCK_BUD = {
      dashboard: {
        run: jest.fn(() => {
          return this
        }),
      },

      isDevelopment: false,

      when: bud.when,

      compiler: {
        compile: mockCompileFn,
      },

      path: jest.fn((...strings: string[]): string => {
        return process.cwd().concat('/.budfiles')
      }),

      run: jest.fn(cb => {
        return cb
      }),

      server: {
        inject: jest.fn(),
        run: jest.fn(),
        config: {
          isTrue: () => true,
        },
      },
    }

    MOCK_BUD.dashboard.run.bind(MOCK_BUD)
    MOCK_BUD.compiler.compile.bind(MOCK_BUD)

    run.bind(MOCK_BUD)()
  })

  it('is a function', () => {
    expect(bud.run).toBeInstanceOf(Function)
  })

  it('calls dashboard.run', () => {
    expect(MOCK_BUD.dashboard.run).toHaveBeenCalled()
  })

  it('calls compiler.compile.run', () => {
    expect(MOCK_BUD.compiler.compile).toHaveBeenCalled()
  })
})
