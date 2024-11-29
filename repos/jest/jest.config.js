module.exports = {
    // Look for tests in the 'src' directory
    roots: ['<rootDir>/src'],
  
    // Test environment to use (jsdom for browser-like environment)
    testEnvironment: 'node',
  
    // Enable coverage collection
    collectCoverage: true,
  
    // Directory where Jest will output coverage reports
    coverageDirectory: 'coverage',
  
    // Coverage threshold: ensures 80% coverage across all areas
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  };