/**
 * @fileoverview Rule to prevent the usage of jQuery
 * @author Kai Cataldo
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
         * @param {ASTNode} ref The node to inspect.
         * @returns {boolean} Is the node jQuery.
         */
        function isJQuery(ref) {
            const name = ref.identifier.name;
            return name === "$" || name === "jQuery";
        }

        return {
            Program() {
                const globalScope = context.getScope();
                const references = globalScope.through.filter(isJQuery);
                const errorMessage = "No jQuery please.";

                references.forEach((reference) => {
                    const node = reference.identifier;
                    context.report({
                        node: node,
                        message: errorMessage,
                    });
                });
            },
        };
    },
};
