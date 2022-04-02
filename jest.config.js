module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^jest-extended$': '<rootDir>/node_modules/jest-extended/dist/index.js',
    '^vue$': 'vue/dist/vue.common.js',
    '^vuetify/(.*)$': '<rootDir>/node_modules/vuetify/dist/vuetify.js',
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  testMatch: [
    '**/__tests__/*.spec.[jt]s?(x)',
    '**/tests/unit/**/*.spec.[jt]s?(x)',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/App.vue',
    '!src/main.js',
    '!src/plugins/*',
    '!src/router/*',
    '!src/constants/*',
  ],
  setupFilesAfterEnv: ['./tests/unit/setup.js'],
};
