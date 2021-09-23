module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "react-in-jsx-scope": "off",
    "prettier/prettier": [
      "error",
      {
        trailingComa: "es5",
        tabWidth: 2,
        semi: false,
        singleQuote: false,
        endOfLine: "auto",
        printWidth: 100,
      },
    ],
  },
}
