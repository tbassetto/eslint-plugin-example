/**
 * @fileoverview Rule to disallow useless coercion
 * @author Thomas Bassetto
 */

"use strict";

// copied from https://github.com/eslint/eslint/blob/ca1f8410fcb40a9bce286e22e23ee695159d15f7/lib/ast-utils.js#L329
/**
 * Checks whether or not a given node is a string literal.
 * @param {ASTNode} node - A node to check.
 * @returns {boolean} `true` if the node is a string literal.
 */
function isStringLiteral(node) {
    return (
        (node.type === "Literal" && typeof node.value === "string") ||
        node.type === "TemplateLiteral"
    );
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "prevent useless coercion",
            category: "Best Practices",
            recommended: true,
        },
        schema: [],
    },
    create(context) {
        /**
         * @param {ASTNode} node The node to inspect.
         * @returns {boolean} `true` is it's a number.
         */
        function isNumber(node) {
            return typeof node.value === "number";
        }
        return {
            CallExpression(node) {
                const callee = node.callee;
                const arg = node.arguments[0] || "";
                if (callee.type === "Identifier") {
                    if (callee.name === "Object" && arg.type === "ObjectExpression") {
                        context.report(node, "No useless Object coercion");
                    } else if (callee.name === "Boolean" && arg.type === "Literal" && (arg.value === true || arg.value === false)) {
                        context.report(node, "No useless Boolean coercion");
                    } else if (callee.name === "String" && arg.type === "Literal" && isStringLiteral(arg)) {
                        context.report(node, "No useless String coercion");
                    } else if (callee.name === "String" && arg.type === "TemplateLiteral") {
                        context.report(node, "No useless String coercion");
                    } else if (callee.name === "Number" && arg.type === "Literal" && isNumber(arg)) {
                        context.report(node, "No useless Number coercion");
                    }
                }
            },
        };
    },
};
