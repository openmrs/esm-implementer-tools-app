module.exports = {
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  globals: {
    System: {},
  },
  moduleNameMapper: {
    "lodash-es": "lodash",
    "\\.(css)$": "identity-obj-proxy",
    "@openmrs/esm-module-config":
      "<rootDir>/__mocks__/openmrs-esm-module-config.mock.tsx",
    "@openmrs/esm-api": "<rootDir>/__mocks__/openmrs-esm-api.mock.tsx",
  },
};
