"use strict";
exports.__esModule = true;
exports.map = void 0;
var map = function (enabled) {
    if (enabled === void 0) { enabled = true; }
    this.logger.info({ name: 'bud.api', "function": 'bud.sourceMap', enabled: enabled }, "bud.sourceMap called");
    this.features.set('sourceMap', enabled !== null && enabled !== void 0 ? enabled : true);
    return this;
};
exports.map = map;
//# sourceMappingURL=map.js.map