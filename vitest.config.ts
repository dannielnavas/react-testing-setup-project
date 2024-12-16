import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // virtualizar el dom en ambiente de pruebas
    globals: true, // Disponibilidad de forma global matchers
    setupFiles: ["./src/setupTest.ts"], // Archivo de configuración
  },
});
