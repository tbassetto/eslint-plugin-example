/**
 * @fileoverview Tests for no-useless-coercion rule.
 * @author Thomas Bassetto
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-useless-coercion");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-useless-coercion", rule, {
    valid: [
        "Object('foo')",
        "Boolean(1)",
        "String(123)",
        "Number('hello world')",
    ],
    invalid: [
        {
            code: "Object({a: 1});",
            errors: [{
                message: "No useless Object coercion",
                type: "CallExpression",
            }],
        },
        {
            code: "Boolean(true);",
            errors: [{
                message: "No useless Boolean coercion",
                type: "CallExpression",
            }],
        },
        {
            code: "String('hello world');",
            errors: [{
                message: "No useless String coercion",
                type: "CallExpression",
            }],
        },
        {
            code: "Number(12);",
            errors: [{
                message: "No useless Number coercion",
                type: "CallExpression",
            }],
        },
    ],
});
