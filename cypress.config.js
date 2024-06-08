const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    baseUrl: 'https://ecommerce-playground.lambdatest.io/',
    viewportHeight: 1200,
    viewportWidth: 1200,
    supportFile: false,
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
    },
  },
})
