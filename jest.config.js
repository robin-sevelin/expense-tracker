const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>jest.setup.js'],
  preset: 'ts-jest',

  reporters: [
    'default',
    ['jest-junit', { outputDirectory: './test-reports/junit' }],
  ],
  verbose: true,
};

module.exports = createJestConfig(config);
