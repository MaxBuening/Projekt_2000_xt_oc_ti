module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
  },
  moduleNameMapper:{
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js"
  },
  moduleDirectories: ["node_modules", "src"],
  automock: false,
  resetMocks: false,
  setupFiles: [
    './setupJest.js'
  ]
}
