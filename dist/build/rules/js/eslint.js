"use strict";
exports.__esModule = true;
exports.eslint = void 0;
var loaders_1 = require("../util/loaders");
var patterns_1 = require("../util/patterns");
var eslint = function (bud) { return ({
    bud: bud,
    rule: {},
    make: function () {
        this.pre();
        this.rule = {
            enforce: 'pre',
            test: patterns_1.patterns.js,
            include: bud.state.paths.src,
            exclude: patterns_1.patterns.vendor,
            loader: loaders_1.loaders.eslint,
            options: {
                configFile: bud.state.configs.eslint,
                formatter: 'codeframe',
                failOnError: true
            }
        };
        this.post();
        return this.rule;
    },
    pre: function () {
        this.bud.hooks.call('pre_eslint', this);
    },
    post: function () {
        this.bud.hooks.call('post_eslint', this.rule);
    }
}); };
exports.eslint = eslint;
//# sourceMappingURL=eslint.js.map