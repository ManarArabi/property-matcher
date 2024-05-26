import globals from 'globals'
import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'
import pluginJest from 'eslint-plugin-jest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended
})

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'script'
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest
      }
    }
  },
  {
    files: ['**/*.test.js'],
    plugins: {
      jest: pluginJest
    },
    rules: pluginJest.configs.recommended.rules
  },
  ...compat.extends('standard')
]
