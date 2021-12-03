import type {Framework} from '@roots/bud-framework'
import {
  createProxyMiddleware,
  responseInterceptor,
} from 'http-proxy-middleware'

/**
 * Proxy middleware factory
 *
 * @public
 */
export default function proxy(app: Framework) {
  /**
   * @filter proxy.dev
   */
  const dev = app.store.get('server.url')

  /**
   * @filter proxy.target
   */
  const target = app.store.get('server.proxy')

  /**
   * @filter proxy.interceptor
   */
  const interceptor = app.hooks.filter<'proxy.interceptor'>(
    'proxy.interceptor',
    () => async (buffer: Buffer) => {
      let response = buffer.toString('utf8')

      return app.hooks
        .filter<'proxy.replace'>('proxy.replace', [
          [target, dev],
        ])
        .reduce(
          (html, [from, to]) => html.replaceAll(from, to),
          response,
        )
    },
  )

  /**
   * @filter proxy.options
   */
  const options = {
    autoRewrite: true,
    changeOrigin: true,
    target,
    cookieDomainRewrite: {
      [target]: dev,
    },
    logProvider: () => app.logger.instance,
    onProxyRes: responseInterceptor(interceptor),
    selfHandleResponse: true,
    headers: {
      'X-Proxy-By': '@roots/bud',
    },
    logLevel: 'info',
    ssl: false,
    secure: false,
    ws: true,
  } as any

  app.log(options)

  return createProxyMiddleware(options)
}
