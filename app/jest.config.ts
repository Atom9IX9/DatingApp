
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

// Factory helper that creates jestconfig objects or state.
const createJestConfig = nextJest({
  dir: './',
});

// Route matching configuration for the middleware.
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// Factory helper that creates jestconfig objects or state.
export default createJestConfig(config);