import {Framework, Service} from '@roots/bud-framework'
import {Container as Collection} from '@roots/container'

import {Api} from './Api'
import {Build} from './Build'
import {Cache} from './Cache'
import {Compiler} from './Compiler'
import {Dashboard} from './Dashboard'
import {Dependencies} from './Dependencies'
import {Env} from './Env'
import {Extensions} from './Extensions'
import {Hooks} from './Hooks'
import {Project} from './Project'
import {Server} from './Server'
import {Services} from './services.interface'

export const services: Services = new Collection<
  Record<string, new (app: Framework) => Service>
>({
  api: Api,
  hooks: Hooks,
  project: Project,
  env: Env,
  build: Build,
  compiler: Compiler,
  cache: Cache,
  dependencies: Dependencies,
  server: Server,
  dashboard: Dashboard,
  extensions: Extensions,
})
