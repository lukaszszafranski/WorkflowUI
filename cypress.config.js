const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'j9eu8b',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
