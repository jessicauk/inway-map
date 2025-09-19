module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["js", "ts", "json", "node"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"]
};