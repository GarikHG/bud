import {Framework} from '../Framework'

/**
 * Peer dependencies interface
 *
 * @public
 */
export interface Interface {
  /**
   * Application framework instance
   *
   * @public
   */
  app: Framework

  /**
   * Collect packages.
   *
   * @public
   */
  discover(
    type: 'dependencies' | 'devDependencies',
  ): Promise<this>

  /**
   * Returns path for a module name (if findable)
   *
   * @public
   */
  getPackageManifestPath(name: string): Promise<string>

  /**
   * Returns manifest for a module from name (if findable)
   *
   * @public
   */
  getManifest(name: string): Promise<Record<string, any>>

  /**
   * Returns true if a module is a bud
   *
   * @public
   */
  isExtension(name: string): boolean
}
