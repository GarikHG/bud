import {Bud} from '../Bud'
import {config} from '../config'
import {services} from '../services'

/**
 * Create a {@link Bud} instance programatically
 *
 * @example
 * ```ts
 * const bud = factory()
 * ```
 *
 * @returns Bud instance
 *
 * @public
 */
export async function factory(
  overrides?: Bud.Options,
): Promise<Bud> {
  const options: Bud.Options = {
    ...(overrides ?? {}),
    services: {
      ...services,
      ...(overrides?.services ?? {}),
    },
    config: {
      ...config,
      ...(overrides?.config ?? {}),
      features: {
        ...config.features,
        ...(overrides?.config?.features ?? {}),
      },
      location: {
        ...config.location,
        ...(overrides?.config?.location ?? {}),
      },
    },
  }

  process.env.BABEL_ENV = options.config.mode
  process.env.NODE_ENV = options.config.mode

  const project = new Bud(options)

  project.time(project.name)
  project.log({
    message: 'process.env.NODE_ENV',
    suffix: process.env.NODE_ENV,
  })
  project.log({
    message: 'process.env.BABEL_ENV',
    suffix: process.env.NODE_ENV,
  })

  await project.lifecycle()
  return project
}
