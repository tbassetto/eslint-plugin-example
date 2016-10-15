/**
 * @fileoverview Tests for no-jquery-smarter rule.
 * @author Thomas Bassetto
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-jquery-smarter");
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
                type: "Identifier",
            }],
        },
        {
            code: "jQuery('span')",
            errors: [{
                message: "No jQuery please.",
                type: "Identifier",
            }],
        },
        {
            code: "$.ajax()",
            errors: [{
                message: "No jQuery please.",
                type: "Identifier",
            }],
        },
        {
            code: "$.csv.report()",
            errors: [{
                message: "No jQuery please.",
                type: "Identifier",
            }],
        },
    ],
});
