import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## project  [💁 Fluent]
     *
     * With no arguments, this function returns the project's root path.
     *
     * Optionally, **bud.project** may be passed a
     * path relative to the project root.
     *
     * In this case it returns the absolute path.
     *
     * ### Usage
     *
     * ```js
     * bud.project()
     * ```
     *
     * ```js
     * bud.project('node_modules')
     * ```
     */
    project: Framework.Api.Project
  }

  namespace Framework.Api {
    type Project = (path?: string) => string
  }
}

export const project: Framework.Api.Project = function (
  segment?,
) {
  return segment
    ? this.disk.path.posix.join(
        this.subscribe('location/project'),
        segment,
      )
    : this.subscribe('location/project')
}
