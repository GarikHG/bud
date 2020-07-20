"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.loaders = void 0;
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
/**
 * Style loaders
 *
 * @type {object} loaders
 */
var loaders = {
    babel: require.resolve('babel-loader'),
    css: require.resolve('css-loader'),
    file: require.resolve('file-loader'),
    eslint: require.resolve('eslint-loader'),
    miniCss: mini_css_extract_plugin_1["default"].loader,
    postCss: require.resolve('postcss-loader'),
    resolveUrl: require.resolve('resolve-url-loader'),
    scss: require.resolve('sass-loader'),
    style: require.resolve('style-loader'),
    svgr: require.resolve('@svgr/webpack'),
    url: require.resolve('url-loader'),
    ts: require.resolve('ts-loader')
};
exports.loaders = loaders;
