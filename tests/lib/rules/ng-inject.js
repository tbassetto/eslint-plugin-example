/**
 * @fileoverview Tests for ng-inject rule.
 * @author Thomas Bassetto
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/ng-inject");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("translation-key-for-notification", rule, {
    valid: [
        "$();",
        "window.find('dsd', test);",
        "notAngular.controller('ctrl1', Ctrl);",
        "angular.module('app', []).controller('ctrl', ['$scope', function($scope) {}]);",
        "angular.module('app', []).controller('ctrl', /* @ngInject */ function($scope) {});",
        "angular.module('app', []).controller('ctrl', Ctrl); /* @ngInject */ function Ctrl() {}",
        "var app = angular.module('app', []); app.controller('ctrl', ['$scope', function($scope) {}]);",
        "var app = angular.module('app', []); app.controller('ctrl', /* @ngInject */ function($scope) {});",
        "var app = angular.module('app', []); app.controller('ctrl', Ctrl); /* @ngInject */ function Ctrl() {}",
    ],
    invalid: [
        {
            code: "angular.module('app', []).controller('ctrl', function($scope) {});",
            errors: [{
                message: "Missing /* @ngInject */",
                type: "FunctionExpression",
            }],
        },
        {
            code: "angular.module('app', []).controller('ctrl', Ctrl); function Ctrl() {}",
            errors: [{
                message: "Missing /* @ngInject */",
                type: "FunctionDeclaration",
            }],
        },
        {
            code: "var app = angular.module('app', []); app.controller('ctrl', function($scope) {});",
            errors: [{
                message: "Missing /* @ngInject */",
                type: "FunctionExpression",
            }],
        },
        {
            code: "var app = angular.module('app', []); app.controller('ctrl', Ctrl); function Ctrl() {}",
            errors: [{
                message: "Missing /* @ngInject */",
                type: "FunctionDeclaration",
            }],
        },
    ],
});
