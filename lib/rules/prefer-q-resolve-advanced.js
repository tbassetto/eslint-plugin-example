/**
 * @fileoverview Rule to disallow $q.when()
 * @author Thomas Bassetto
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "disallow the use of `$q.when()`",
            category: "Best Practices",
            recommended: true,
        },
        fixable: "code",
        schema: [],
    },
    create(context) {
        /**
         * Report an error.
         * @param {ASTNode} node The node with the error.
         * @returns {void}
         */
        function report(node) {
            context.report({
                node: node,
                message: "Prefer using $q.resolve() instead of $q.when()",
                fix(fixer) {
                    return fixer.replaceText(node, "resolve");
                },
            });
        }
        return {
            CallExpression(node) {
                const callee = node.callee;
                if (callee.type === "MemberExpression" && callee.property.name === "when") {
                    if (callee.object.name === "$q") {
                        report(callee.property);
                    } else {
                        const scope = context.getScope();
                        // find our root var among the variables in the scope
                        const theVar = scope.variables
                            .filter(n => n.name === callee.object.name);
                        if (theVar[0] && theVar[0].defs[0].node.init.name === "$q") {
                            report(callee.property);
                        }
                    }
                }
            },
        };
    },
};
