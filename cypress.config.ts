import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'pw3n5c',
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
