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
        return {
            CallExpression(node) {
                const callee = node.callee;
                if (callee.type === "MemberExpression" &&
                    callee.object.name === "$q" &&
                    callee.property.name === "when") {
                    context.report({
                        node: callee.property,
                        message: "Prefer using $q.resolve() instead of $q.when()",
                        fix: function(fixer) {
                            return fixer.replaceText(callee.property, "resolve");
                        },
                    });
                }
            },
        };
    },
};
