module.exports = {
  "env": {
    "browser": false,
    "es6": true,
    "node": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json",
    "sourceType": "module"
  },
  "extends": [
    "./eslint-config-ccm"
  ],
  "rules":{
    "prefer-spread": ['off']
  }
}
