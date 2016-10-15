/**
 * @fileoverview Tests for prefer-q-resolve-advanced rule.
 * @author Thomas Bassetto
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/prefer-q-resolve-advanced");
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
        // More advanced use case
        {
            code: "var horse = $q;horse.when();",
            errors: [{
                message: "Prefer using $q.resolve() instead of $q.when()",
                type: "Identifier",
            }],
            output: "var horse = $q;horse.resolve();",
        },
    ],
});
