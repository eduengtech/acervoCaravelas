import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from "eslint-plugin-prettier/recommended";

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettier, 
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    rules: {
      "prettier/prettier": [
        "error",
        {
          "printWidth": 90,
          "semi": true,
          "singleQuote": false,
          "tabWidth": 2,
          "trailingComma": "all",
          "endOfLine": "auto"
        }
      ],
      "@typescript-eslint/no-explicit-any": "error",
    }
  },
])
