module.exports = {
    "plugins": ["node"],
    "extends": [
        "eslint",
        "plugin:node/recommended",
    ],
    rules: {
        "comma-dangle": ["error", "always-multiline"],
    },
};
