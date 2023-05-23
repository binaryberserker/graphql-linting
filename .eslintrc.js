// NOTE: this is pretty much a straight copy of my actual eslintrc

module.exports = {
  env: {
    commonjs: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'unknown',
        ],
        'newlines-between': 'always',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['./src/tests/**'],
      },
    ],
    'no-console': 1,
    'newline-before-return': 1,
    'no-unexpected-multiline': 0,
    'no-useless-return': 1,
    'prefer-const': 1,
    'no-unused-vars': ['warn', {ignoreRestSiblings: true}], // allows removing object properties via destructuring
    'no-undef': 0, // setting to no warning because otherwise all module.exports will have an error
    'no-undef-init': 1,
    'no-undefined': 1,
    'consistent-return': 0,
    'import/no-cycle': 0,
    'no-restricted-globals': 1,
    'import/no-default-export': 0,
    'no-template-curly-in-string': 2,
    'require-await': 0,
    'no-use-before-define': 0, // can't use due to classes being shared
    'no-multi-assign': 1,
    'no-tabs': 1,
    'no-unneeded-ternary': 1,
    'no-const-assign': 2,
    'no-var': 2,
    'prefer-spread': 1,
    'prefer-template': 1,
    'no-useless-concat': 1,
    'no-eval': 2,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-unused-vars': ['warn', {ignoreRestSiblings: true}],
    '@typescript-eslint/no-var-requires': 1,
    '@typescript-eslint/naming-convention': [
      1,
      {selector: 'variable', format: ['camelCase', 'UPPER_CASE', 'PascalCase']},
      {selector: 'typeLike', format: ['PascalCase']},
      {selector: 'interface', format: ['PascalCase']},
    ],
  },
  overrides: [
    // Parse typescript for gql tags
    {
      files: ['*.ts'],
      plugins: ['@graphql-eslint'],
      processor: '@graphql-eslint/graphql',
      parser: '@typescript-eslint/parser',
    },
    // Setup GraphQL Parser
    {
      files: ['*.graphql', '*.gql'],
      plugins: ['@graphql-eslint'],
      parser: '@graphql-eslint/eslint-plugin',
      rules: {
        '@graphql-eslint/no-deprecated': 'warn',
        '@graphql-eslint/known-argument-names': 'error', // NOTE: added this line to give it something to fail on
      },
    },
  ],
  settings: {
    'import/resolver': {
      // Allow `@middleware/` to map to `src/middleware/`
      alias: {
        extensions: ['.ts', '.js', '.json'],
      },
    },
    react: {
      version: 'detect',
    },
  },
}
