module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.spec.ts'],
  clearMocks: true,
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: { module: 'CommonJS', moduleResolution: 'Node', jsx: 'react-jsx' },
    }],
  },
};
