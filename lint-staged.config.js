module.exports = {
  '*.{js,js,ts,ts}': ['eslint --fix', 'eslint'],
  '**/*.ts': () => 'npm run check-types',
  '*.json': ['prettier --write'],
};
