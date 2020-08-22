/**
 * @roots/bud v.2.0.0-next.0 {@link https://roots.io/bud}
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
var js = function (bud) {
    return bud.hooks.filter('webpack.module.rules.js', {
        test: bud.hooks.filter('webpack.module.rules.js.test', bud.patterns.get('js')),
        exclude: bud.hooks.filter('webpack.module.rules.js.exclude', bud.patterns.get('vendor')),
        use: bud.hooks.filter('webpack.module.rules.js.use', [
            bud.uses.get('babel')(bud),
        ]),
    });
};

export { js };
