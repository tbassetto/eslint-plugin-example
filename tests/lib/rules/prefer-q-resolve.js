/**
 * @fileoverview Tests for prefer-q-resolve rule.
 * @author Thomas Bassetto
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/prefer-q-resolve");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("prefer-q-resolve", rule, {
    valid: [
        {
            code: "somethingElse.$q.when()",
            globals: ["somethingElse"],
        },
        "$q.when.somethingElse()",
        "$q.resolve()",
        "$q.reject()",
        "$q()",
    ],
    invalid: [
        {
            code: "$q.when()",
            errors: [{
                message: "Prefer using $q.resolve() instead of $q.when()",
                type: "Identifier",
            }],
            output: "$q.resolve()",
        },
    ],
});
