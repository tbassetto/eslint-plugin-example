/**
 * @fileoverview Rule to prevent the usage of jQuery
 * @author Thomas Bassetto
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "prevent the usage of jQuery",
            category: "Best Practices",
            recommended: true,
        },
        schema: [],
    },
    create(context) {
        /**
         * Check if the node is jQuery.
         * @param {ASTNode} node The node to inspect.
         * @returns {boolean} Is the node jQuery.
         */
        function isJQuery(node) {
            return node.name === "$" || node.name === "jQuery";
        }

        /**
         * Report an error.
         * @param {ASTNode} node The node with the error.
         * @returns {void}
         */
        function report(node) {
            context.report({
                node: node,
                message: "No jQuery please.",
            });
        }

        return {
            CallExpression(node) {
                const callee = node.callee;
                if (callee.type === "Identifier" && isJQuery(callee)) {
                    report(node);
                } else if (callee.type === "MemberExpression") {
                    let target = callee.object;
                    while (target.type !== "Identifier") {
                        target = target.object || target.callee;
                    }
                    if (isJQuery(target)) {
                        report(node);
                    }
                }
            },
        };
    },
};
