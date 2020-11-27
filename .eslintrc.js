module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true
    },
    ecmaVersion: 12,
    lib: [
      'es2019',
      'es2020.bigint',
      'es2020.string',
      'es2020.symbol.wellknown'
    ],
    project: {
      extends: './tsconfig.json',
      include: ['src/**/*.ts']
    }
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  rules: {
    complexity: ['error', { max: 3 }]
  }
}
