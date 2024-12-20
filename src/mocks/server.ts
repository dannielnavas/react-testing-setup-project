import { setupServer } from "msw/node";
import { handlers } from "./handlers"; // Ensure handlers is an array

const server = setupServer(...handlers);

export { server };
