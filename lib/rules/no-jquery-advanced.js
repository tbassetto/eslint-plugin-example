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

        const chains = [];

        return {
            "CallExpression:exit"(node) {
                if (node.callee.type === "Identifier" && isJQuery(node.callee)) {
                    chains.push(node.callee);
                    report(node);
                } else if (node.callee.type === "MemberExpression") {
                    let target = node.callee.object;

                    while (target.type !== "Identifier") {
                        target = target.object || target.callee;
                    }

                    if (isJQuery(target)) {
                        target = node.callee.object;
                        let haveWeSeenChainBefore = chains.indexOf(target) !== -1;
                        while (!haveWeSeenChainBefore && target.type !== "Identifier") {
                            target = target.object || target.callee;
                            haveWeSeenChainBefore = chains.indexOf(target) !== -1;
                        }
                        if (haveWeSeenChainBefore) {
                            return;
                        }
                        chains.push(node.callee.object);
                        report(node);
                    }
                }
            },
        };
    },
};
