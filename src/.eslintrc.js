module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
  rules: {
    "react/prop-types": 0,
  },
  env: {
    commonjs: true,
    node: true,
    browser: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
};
