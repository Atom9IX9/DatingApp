import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config = {
  coverageProvider: "v8",
  testEnvironment: "jest-fixed-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

const makeJestConfig = async () => {
  const config = await createJestConfig(customJestConfig)();

  // Примусово дозволяємо Jest транспілювати msw та його ESM-залежності
  config.transformIgnorePatterns = [
    "/node_modules/(?!(until-async|msw|@mswjs|@bundled-es-modules)/)",
  ];

  return config;
};

export default makeJestConfig;
