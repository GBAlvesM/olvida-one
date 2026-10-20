module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    // allow the React identifier to be unused because Vite uses the new JSX transform
    'no-unused-vars': ['error', { 'varsIgnorePattern': '^React$' }],
    // keep rules minimal for the academic prototype
  },
  settings: {
    react: { version: 'detect' }
  }
}
