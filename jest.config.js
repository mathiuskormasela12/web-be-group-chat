/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  maxConcurrency: 10,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '!src/main.ts',
    '!coverage'
  ]
}
