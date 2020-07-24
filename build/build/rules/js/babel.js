"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.babel = void 0;
var loaders_1 = require("../util/loaders");
/**
 * Babel
 *
 * @type {function} babel
 * @return {object}
 */
var babel = function (bud) { return ({
    bud: bud,
    output: {},
    enabled: bud.state.features.babel,
    loader: loaders_1.loaders.babel,
    options: __assign(__assign({}, bud.state.options.babel), { cacheDirectory: true, cacheCompression: bud.inProduction }),
    /**
     * Make babel rules
     */
    make: function () {
        this.pre();
        this.output = this.enabled
            ? {
                loader: this.loader,
                options: this.options
            }
            : {};
        this.post();
        return this.output;
    },
    /**
     * Hook: pre_babel
     */
    pre: function () {
        this.bud.hooks.call('pre_babel', this);
    },
    /**
     * Hook: post_babel
     */
    post: function () {
        this.bud.hooks.call('post_babel', this.output);
    }
}); };
exports.babel = babel;
//# sourceMappingURL=babel.js.map