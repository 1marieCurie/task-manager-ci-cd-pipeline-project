import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {

    baseUrl: "http://localhost:5173",
    //two properties for e2e testing
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",

    supportFile: "cypress/support/e2e.js",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
