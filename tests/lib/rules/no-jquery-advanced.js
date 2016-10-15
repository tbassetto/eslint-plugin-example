/**
 * @fileoverview Tests for no-jquery-advanced rule.
 * @author Thomas Bassetto
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-jquery-advanced");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-jquery", rule, {
    valid: [
        "document.querySelectorAll('div')",
        "$http.get('https://www.google.com')",
    ],
    invalid: [
        {
            code: "$('div')",
            errors: [{
                message: "No jQuery please.",
                type: "CallExpression",
            }],
        },
        {
            code: "jQuery('span')",
            errors: [{
                message: "No jQuery please.",
                type: "CallExpression",
            }],
        },
        {
            code: "$.ajax()",
            errors: [{
                message: "No jQuery please.",
                type: "CallExpression",
            }],
        },
        {
            code: "$.csv.report()",
            errors: [{
                message: "No jQuery please.",
                type: "CallExpression",
            }],
        },
        // More advanced use case
        {
            code: "$('div').find('span').remove();",
            errors: [{
                message: "No jQuery please.",
                type: "CallExpression",
            }],
        },
    ],
});
