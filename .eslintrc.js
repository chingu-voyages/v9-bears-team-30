module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": "off",
        "comma-dangle": "off",
        "no-trailing-spaces": "off",
        "no-unused-vars": "warn",
        "no-multiple-empty-lines": "off",
        "semi": "off",
        "eol-last": "warn",
        "linebreak-style": "off",
        "quotes": "off",
        "space-before-function-paren": "off",
        "no-console": "off"
    }
}