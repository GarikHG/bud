"use strict";
exports.__esModule = true;
exports.splitting = void 0;
/**
 * ## bud.splitting
 *
 * Enable or disable code splitting.
 *
 * ```js
 * bud.splitting(false)
 * ```
 */
var splitting = function (enabled) {
    this.state.features.splitting = enabled;
    return this;
};
exports.splitting = splitting;
//# sourceMappingURL=splitting.js.map