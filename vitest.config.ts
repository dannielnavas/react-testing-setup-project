import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // virtualizar el dom en ambiente de pruebas
    globals: true, // Disponibilidad de forma global matchers
    setupFiles: ["./src/setupTest.ts"], // Archivo de configuración
    coverage: {
      exclude: [
        "**/*.config.ts",
        "**/*.config.js",
        "**/*.type.ts",
        "**/*d.ts",
        "**/types",
        "**/App.tsx",
        "**/main.tsx",
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      }, // Umbral de cobertura
    }, // Generar reporte de cobertura
  },
});
