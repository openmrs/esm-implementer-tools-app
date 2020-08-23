module.exports = {
  transform: {
    "^.+\\.tsx?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
    "@openmrs/esm-module-config":
      "<rootDir>/__mocks__/openmrs-esm-module-config.mock.tsx"
  }
};
