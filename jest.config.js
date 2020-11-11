module.exports = {
  transform: { ".ts": "ts-jest" },
  testEnvironment: "node",
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|js)$",
  moduleFileExtensions: ["ts", "js"],
  coveragePathIgnorePatterns: ["/node_modules/", "/test/"],
  collectCoverageFrom: ["src/*.{js,ts}"],
};
