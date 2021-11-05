export const config = async (app, flags) => {
  /**
   * Handle --src flag
   */
  if (typeof flags.src !== 'undefined') {
    app.setPath('src', flags.src)
    app.children.every((_name, child) =>
      child.setPath('src', flags.src),
    )
  }

  /**
   * Handle --dist flag
   */
  if (typeof flags.dist !== 'undefined') {
    app.setPath('dist', flags.dist)
    app.children.every((_name, child) =>
      child.setPath('dist', flags.dist),
    )
  }

  /**
   * Handle --publicPath flag
   */
  if (typeof flags.publicPath !== 'undefined') {
    app.setPublicPath(flags.publicPath)
    app.children.every((_name, child) =>
      child.setPublicPath(flags.publicPath),
    )
  }

  /**
   * Handle --cache flag
   */
  if (typeof flags.cache !== 'undefined') {
    app.persist(flags.cache)
    app.children.every((_name, child) =>
      child.persist(flags.cache),
    )
  }

  /**
   * Handle --devtool flag
   */
  if (typeof flags.devtool !== 'undefined') {
    app.devtool(flags.devtool)
    app.children.every((_name, child) =>
      child.devtool(flags.devtool),
    )
  }

  /**
   * Handle --devtool flag
   */
  if (typeof flags.hash !== 'undefined') {
    app.hash(flags.hash)
    app.children.every((_name, child) => child.hash(flags.hash))
  }

  /**
   * Handle --runtime flag
   */
  if (typeof flags.runtime !== 'undefined') {
    app.runtime(flags.runtime)
    app.children.every((_name, child) =>
      child.runtime(flags.runtime),
    )
  }

  /**
   * Handle --manifest flag
   */
  if (typeof flags.manifest !== 'undefined') {
    app.store.set('manifest', flags.manifest)
    app.children.every((_name, child) =>
      child.store.set('manifest', flags.manifest),
    )
  }

  /**
   * Handle --minimize flag
   */
  if (typeof flags.minimize !== 'undefined') {
    app.minimize(flags.minimize)
    app.children.every((_name, child) => {
      child.minimize(flags.minimize)
    })
  }

  /**
   * Handle --minimize flag
   */
  if (typeof flags.vendor !== 'undefined') {
    app.splitChunks(flags.vendor)
    app.children.every((_name, child) => {
      child.splitChunks(flags.vendor)
    })
  }

  /**
   * Handle --target flag
   *
   * @example `$ bud build --target plugin`
   */
  if (flags.target.length > 0) {
    /**
     * Handle parent if applicable
     */
    !flags?.target?.includes('bud') &&
      app.hooks.on('build.entry', false)

    /**
     * And children if applicable
     */
    app.children.getKeys().forEach(name => {
      !flags?.target?.includes(name) && app.children.remove(name)
    })
  }
}
