module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',   // adjust as needed
    '!src/**/*.d.ts',             // ignore TypeScript declaration files
    '!src/**/index.{ts,tsx,js}',  // optionally ignore barrel files
    '!src/**/__tests__/**',       // ignore test folders
  ],
  coverageReporters: ['text', 'html', 'lcov'],
};
