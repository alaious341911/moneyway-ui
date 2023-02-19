module.exports = {
  extends: ["next/core-web-vitals", "eslint-config-prettier", 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  "rules": {
    "@typescript-eslint/no-unused-vars": "off",
    "react/no-unescaped-entities": "off",
  }
};