import {Project} from '../util/integration'

jest.setTimeout(60000)

describe('examples/babel', () => {
  let project: Project

  beforeAll(async () => {
    project = new Project({
      name: 'babel',
      dir: 'examples/babel',
    })

    await project.setup()
  })

  describe('app.js', () => {
    it('has contents', () => {
      expect(project.assets['app.js'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(
        project.assets['app.js'].includes('import'),
      ).toBeFalsy()
    })

    it('matches snapshot', () => {
      expect(project.assets['app.js']).toMatchSnapshot()
    })
  })

  describe('app.css', () => {
    it('has contents', () => {
      expect(project.assets['app.css'].length).toBeGreaterThan(
        10,
      )
    })

    it('is transpiled', () => {
      expect(
        project.assets['app.css'].includes('import'),
      ).toBeFalsy()
    })

    it('matches snapshot', () => {
      expect(project.assets['app.css']).toMatchSnapshot()
    })
  })

  it('manifest.json', async () => {
    expect(project.manifest).toMatchSnapshot()
  })

  it('.budfiles/bud/webpack.config.js', async () => {
    expect(project.webpackConfig.entry).toMatchSnapshot()
    expect(project.webpackConfig.mode).toMatchSnapshot()
    expect(project.webpackConfig.optimization).toMatchSnapshot()
    expect(project.webpackConfig.bail).toMatchSnapshot()
    expect(project.webpackConfig.cache.type).toMatchSnapshot()
  })

  it('module map matches snapshot', async () => {
    expect(project.modules.chunks).toMatchSnapshot({
      byName: {
        app: expect.any(Number),
      },
      bySource: {
        '0 app': expect.any(Number),
      },
      usedIds: expect.any(Array),
    })
  })
})
