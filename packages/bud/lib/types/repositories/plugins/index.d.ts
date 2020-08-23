import type { Bud } from '../..';
import type { Loose } from '@roots/bud-typings';
import type { Repository } from '@roots/bud-framework';
import type { Plugin as WebpackPlugin } from 'webpack';
/**
 * Conditional check determining whether to engage extension functionality.
 */
export declare type ExtensionConditional = (this: ExtensionInterface) => boolean;
/**
 * Extension method handling options
 */
export declare type ExtensionOptions = (this: ExtensionInterface) => Loose;
/**
 * Constitutes primary extension action.
 */
export declare type ExtensionMake = (this: ExtensionInterface) => WebpackPlugin | void;
/**
 * Bud Extension Interface
 *
 * @interface
 */
export interface ExtensionInterface extends Loose {
    /**
     * Bud container.
     */
    bud: Bud;
    /**
     * Extension identifier.
     */
    name: string;
    /**
     * Extension options.
     */
    options?: Repository;
    /**
     * Set extension options
     */
    setOptions?: ExtensionOptions;
    /**
     * Merge extension options
     */
    mergeOptions?: ExtensionOptions;
    /**
     * Primary action of extension.
     */
    make: ExtensionMake;
    /**
     * Extension is utilized when true.
     */
    when?: ExtensionConditional;
}
/**
 * Bud Extension
 */
export declare type Extension = (bud: Bud) => ExtensionInterface;
export declare type ExtensionRepository = Extension[];
/**
 * Extension Repository
 */
export declare type ExtensionRepositoryDefinition = {
    name: string;
    register: ExtensionRepository;
};
/**
 * Bud Webpack Adapters
 */
declare const plugins: ExtensionRepositoryDefinition;
export { plugins };
//# sourceMappingURL=index.d.ts.map