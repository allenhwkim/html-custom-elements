module.exports = {
  collectCoverage: false,
  testMatch: [
    '**/*.spec.js',
    '*.spec.js'
  ],
  moduleFileExtensions: ['js', 'html', 'json'],
  moduleNameMapper: null,
  reporters: [
    ['jest-html-reporter', {
      pageTitle: 'Unit Test Report',
      outputPath: './reports/unit-test-report/index.html',
      includeFailureMsg: true
    }],
    'default'
  ],
  coverageDirectory: './reports/coverage',
  collectCoverageFrom: ['src/**/*.js'],
  coverageThreshold: {
    'global': {
      // 'branches': 80,
      'functions': 90,
      'lines': 90,
      'statements': 100
    }
  }
};
