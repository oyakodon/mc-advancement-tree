import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from 'eslint-config-prettier'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const config = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "plugin:import/recommended",
      "plugin:import/warnings"
    ],
    plugins: [
      "unused-imports"
    ],
    rules: {
      "import/order": [
        "error",
        {
          "alphabetize": {
            "order": "asc"
          },
          "newlines-between": "always"
        }
      ],
      "unused-imports/no-unused-imports": "error"
    }
  }),
  eslintConfigPrettier
];

export default config;
