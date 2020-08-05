import { Bud } from '../types';
export { Bud } from '../types';
import type { Options as BrowserSyncOptions } from 'browser-sync';
export type { BrowserSyncOptions };
import type { Configuration as WebpackConfiguration, Options as WebpackOptions } from 'webpack';
export type { WebpackConfiguration, WebpackOptions };
import type { Options as StylelintOptions } from 'stylelint-webpack-plugin/declarations/getOptions';
export type { StylelintOptions };
import { Options as DependencyExtractionOptions } from '@wordpress/dependency-extraction-webpack-plugin';
export type { DependencyExtractionOptions };
export declare type Alias = (arg0: object) => Bud;
export declare type Auto = (options: {
    [key: string]: string[];
}) => Bud;
export declare type BabelCfg = (options: BabelOptions) => Bud;
export declare type Bundle = (name: string, entries: string[]) => Bud;
export declare type Copy = (from: string, to: string) => Bud;
export declare type Debug = (enabled?: boolean) => any;
export declare type DependencyManifest = (settings?: DependencyExtractionOptions) => Bud;
export declare type Dev = (options: object) => Bud;
export declare type Devtool = (devtool: WebpackOptions.Devtool) => Bud;
export declare type Dist = (path?: string) => string;
export declare type Dump = (enabled: boolean) => Bud;
export declare type Eslint = (enabled: boolean) => Bud;
export declare type PathSetter = (path: string) => Bud;
export declare type Glob = (this: Bud, output: string, files: string) => Bud;
export declare type Hash = (this: Bud, enabled?: boolean) => Bud;
export declare type Hot = (this: Bud, options: {
    enabled: boolean;
    host: string;
    port?: number;
    watch?: string[];
    open?: boolean;
    headers?: object;
    secure?: boolean;
}) => Bud;
export declare type InlineManifest = (name?: string) => Bud;
export declare type Mini = (enabled?: boolean) => Bud;
export declare type Option = (key: string) => string;
export declare type PostCss = (options?: {
    enabled?: boolean;
    plugins?: any[];
}) => Bud;
export declare type Preset = (path?: string) => any;
export declare type Project = (path?: string) => string;
export declare type Purge = (any: any) => Bud;
export declare type Resolve = (moduleName: string) => string;
export declare type Scss = (enabled?: boolean) => Bud;
export declare type SourceMap = (enabled?: boolean) => Bud;
export declare type Splitting = (enabled?: boolean) => Bud;
export declare type Stylelint = (options: {
    enabled?: boolean;
    options?: StylelintOptions;
}) => Bud;
export declare type Src = (path?: string) => string;
export declare type Sync = (options: SyncOptions) => Bud;
export declare type Target = (target: string) => Bud;
export declare type Terser = (options: {
    enable?: boolean;
    terser?: object;
}) => Bud;
export declare type Watch = (options: {
    paths: string[];
    enabled: boolean;
}) => Bud;
export declare type Vendor = (name?: string) => Bud;
export declare type Vue = (vueOptions?: {
    enabled: boolean;
    options: any;
}) => Bud;
export declare type Api = {
    alias: Alias;
    auto: Auto;
    babel: BabelCfg;
    bundle: Bundle;
    compile: any;
    config: any;
    copy: Copy;
    copyAll: Copy;
    debug: Debug;
    dependencyManifest: DependencyManifest;
    dev: Dev;
    devtool: Devtool;
    dist: Dist;
    distPath: PathSetter;
    dump: Dump;
    eslint: Eslint;
    glob: Glob;
    hash: Hash;
    hot: Hot;
    project: Project;
    publicPath: PathSetter;
    purge: Purge;
    splitting: Splitting;
    terser: Terser;
    inlineManifest: InlineManifest;
    map: SourceMap;
    mini: Mini;
    postCss: PostCss;
    preset: Preset;
    projectPath: PathSetter;
    resolve: Resolve;
    scss: Scss;
    src: Src;
    srcPath: PathSetter;
    stylelint: Stylelint;
    sync: Sync;
    target: Target;
    vendor: Vendor;
    vue: Vue;
    watch: Watch;
};
import { TransformOptions as BabelOptions } from '@babel/core';
export { BabelOptions };
export interface SyncOptions {
    enabled?: boolean;
    options: BrowserSyncOptions;
}
//# sourceMappingURL=types.d.ts.map