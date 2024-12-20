import "@testing-library/jest-dom"; // Importar jest-dom trae los matchers necesarios para los test
import { afterAll, afterEach, beforeAll } from "vitest"; // Importar vitest para poder usar las funciones de test
// AfterAll se ejecuta después de todos los test
// AfterEach se ejecuta después de cada test
// BeforeAll se ejecuta antes de todos los test

import { server } from "./mocks/server"; // Importar el servidor de msw

beforeAll(() => server.listen()); // Iniciar el servidor de msw antes de todos los test
afterEach(() => server.resetHandlers()); // Reiniciar los handlers después de cada test
afterAll(() => server.close()); // Cerrar el servidor después de todos los test
