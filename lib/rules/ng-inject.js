/**
 * @fileoverview Rule to enforce the presence of AngularJS dependency injection annotations
 * @author Thomas Bassetto
 */

/* eslint-disable require-jsdoc, consistent-return */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "check proper usage of the Notification service",
            category: "Best Practices",
            recommended: true,
        },
        schema: [],
    },
    create(context) {
        var angularChainableNames = [
            "animation",
            "component",
            "config",
            "constant",
            "controller",
            "directive",
            "factory",
            "filter",
            "provider",
            "run",
            "service",
            "value",
        ];
        var angularComponents = [];
        var angularModuleIdentifiers = [];
        var ngInjectComments = [];
        var errorMessage = "Missing /* @ngInject */";

        function isObjectFromAngular(node, scope) {
            if (node.type === "Identifier") {
                if (node.name === "angular") {
                    return true;
                } else {
                    var isAngularModule = scope.variables.some(function(variable) {
                        if (node.name !== variable.name) {
                            return false;
                        }
                        return variable.identifiers.some(function(id) {
                            return angularModuleIdentifiers.indexOf(id) !== -1;
                        });
                    });
                    return isAngularModule;
                }
            } else if (node.type === "CallExpression") {
                do {
                    if (node.type === "CallExpression") {
                        node = node.callee;
                    } else if (node.type === "MemberExpression") {
                        node = node.object;
                    }
                } while (node.type !== "Identifier");
                return isObjectFromAngular(node, scope);
            }
            return false;
        }

        function findAnnotationTarget(callExpressionNode, scope) {
            var node;
            if (callExpressionNode.callee.type === "Identifier") {
                node = callExpressionNode.arguments[0];
            } else if (callExpressionNode.callee.property.name === "run" || callExpressionNode.callee.property.name === "config") {
                node = callExpressionNode.arguments[0];
            } else {
                node = callExpressionNode.arguments[1];
            }
            if (!node) {
                return;
            }
            if (node.type === "ArrayExpression") {
                node = node.elements[node.elements.length - 1];
            }
            if (node.type === "FunctionExpression" || node.type === "FunctionDeclaration") {
                return node;
            }
            if (node.type !== "Identifier") {
                return;
            }
            var func;
            scope.variables.some(function(variable) {
                if (variable.name === node.name) {
                    variable.defs.forEach(function(def) {
                        if (def.node.type === "FunctionDeclaration") {
                            func = def.node;
                            // return true;
                        }
                    });
                    return true;
                }
                return false;
            });
            return func;
        }

        function collectNgInjectComments(node) {
            if (node.value.trim() === "@ngInject") {
                ngInjectComments.push(node);
            }
        }

        function findUniqueTargets(components) {
            var uniq = [];
            components.forEach(function(component) {
                var target = component.toAnnotate;
                var loc = {
                    start: target.start,
                    end: target.end,
                };
                var found = false;
                for (var i = 0; i < uniq.length; i++) {
                    var u = uniq[i].toAnnotate;
                    if (u.start === loc.start && u.end === loc.end) {
                        found = true;
                        return;
                    }
                }
                if (!found) {
                    uniq.push(component);
                }
            });
            return uniq;
        }

        function commentOnTheLineAbove(fn, comment) {
            return fn.loc.start.line - 1 === comment.loc.start.line &&
                fn.loc.start.column === comment.loc.start.column;
        }

        function commentIsJustBeforeOnTheSameLine(fn, comment) {
            return fn.loc.start.line === comment.loc.start.line &&
                fn.loc.start.column - comment.loc.end.column <= 2;
        }

        function findCorrespondingComment(fn) {
            for (var i = 0; i < ngInjectComments.length; i++) {
                var comment = ngInjectComments[i];
                var lineAbove = commentOnTheLineAbove(fn, comment);
                var justBefore = commentIsJustBeforeOnTheSameLine(fn, comment);
                if (lineAbove || justBefore) {
                    return true;
                }
            }
            return false;
        }

        return {
            "CallExpression:exit"(node) {
                var callee = node.callee;
                // would not be angular otherwise
                if (callee.type === "MemberExpression") {
                    if (node.parent.type === "VariableDeclarator") {
                        // var app = angular.module()
                        //     ^^^
                        angularModuleIdentifiers.push(node.parent.id);
                    }
                    // would not be angular otherwise
                    if (node.arguments.length === 2 && (node.arguments[1].type === "Identifier" || node.arguments[1].type === "FunctionExpression")) {
                        var propertyName = callee.property.name;
                        var isPropertyATarget = angularChainableNames.indexOf(propertyName) >= 0;
                        if (isPropertyATarget) {
                            var objectFromAngular = isObjectFromAngular(callee.object, context.getScope());
                            if (objectFromAngular) {
                                angularComponents.push({
                                    callExpression: node,
                                    toAnnotate: findAnnotationTarget(node, context.getScope()),
                                });
                            }
                        }
                    }
                }
            },
            BlockComment: collectNgInjectComments,
            LineComment: collectNgInjectComments,
            "Program:exit"() {
                var uniq = findUniqueTargets(angularComponents);

                uniq.forEach(function(u) {
                    var correspondingNgInject = findCorrespondingComment(u.toAnnotate);
                    if (!correspondingNgInject) {
                        context.report({
                            node: u.toAnnotate,
                            message: errorMessage,
                        });
                    }
                });
            },
        };
    },
};
