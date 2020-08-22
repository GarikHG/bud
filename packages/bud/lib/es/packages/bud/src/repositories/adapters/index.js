/**
 * @roots/bud v.2.0.0-rc.7 {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import { browserSync } from './browserSync.js';
import { cleanWebpack } from './cleanWebpack.js';
import { copy } from './copy.js';
import { define } from './define.js';
import { fixStyleOnlyEntries } from './fixStyleOnlyEntries.js';
import { hotModuleReplacement } from './hotModuleReplacement.js';
import { limitChunkCount } from './limitChunkCount.js';
import { miniCssExtract } from './miniCssExtract.js';
import { manifest } from './manifest.js';
import { provide } from './provide.js';
import { terser } from './terser.js';
import { writeFile } from './writeFile.js';

/**
 * Bud Webpack Adapters
 */
var adapters = [
    browserSync,
    cleanWebpack,
    copy,
    define,
    fixStyleOnlyEntries,
    hotModuleReplacement,
    manifest,
    miniCssExtract,
    provide,
    limitChunkCount,
    terser,
    writeFile,
];

export { adapters };
