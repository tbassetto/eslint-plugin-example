"use strict";

const preferQResolve = require("./lib/rules/prefer-q-resolve");
const preferQResolveAdvanced = require("./lib/rules/prefer-q-resolve-advanced");
const noJQuery = require("./lib/rules/no-jquery");
const noJQueryAdvanced = require("./lib/rules/no-jquery-advanced");
const ngInject = require("./lib/rules/ng-inject");

module.exports = {
    rules: {
        "prefer-q-resolve": preferQResolve,
        "prefer-q-resolve-advanced": preferQResolveAdvanced,
        "no-jquery": noJQuery,
        "no-jquery-advanced": noJQueryAdvanced,
        "ng-inject": ngInject,
    },
};
