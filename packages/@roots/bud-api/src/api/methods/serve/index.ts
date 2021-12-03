import type {Framework, Server} from '@roots/bud-framework'

export interface serve {
  (config?: Partial<Server.Configuration>): Framework
}

export const serve: serve = function (config) {
  this as Framework

  config.url && this.store.set('server.url', config.url)

  config.middleware &&
    this.store.merge('server.middleware', config.middleware)

  return this
}
