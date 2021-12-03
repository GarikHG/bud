import {Framework} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'

const {isUndefined} = lodash

export interface proxy {
  (options?: boolean): Framework
}

export interface proxy {
  (options?: string): Framework
}

export const proxy: proxy = function (options) {
  this as Framework

  if (options === false) {
    this.store.set('server.middleware.proxy', false)
    return this
  }

  this.store.set('server.middleware.proxy', true)

  if (options === true || isUndefined(options)) {
    return this
  }

  this.store.set('server.proxy', options)
  return this
}
