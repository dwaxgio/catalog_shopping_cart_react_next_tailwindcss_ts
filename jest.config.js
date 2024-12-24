const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(css|scss|jpg|jpeg|png|svg|gif)$": "identity-obj-proxy",
    "@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/__tests__/**/*.test.(ts|tsx)"],
};

module.exports = createJestConfig(customJestConfig);
