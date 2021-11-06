import {factory, Framework} from '@roots/bud'

describe('@roots/bud-framework child', () => {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({config: {ci: true, log: false}})
  })

  it("root compiler's name is this", () => {
    expect(bud.name).toBe('bud')
  })

  it('root.isRoot is false', () => {
    expect(bud.isRoot).toBe(true)
  })
})
