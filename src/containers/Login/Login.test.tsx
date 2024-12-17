// import { act, fireEvent, render, screen } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom"; // esto corren en ambiente de pruebas
// import { describe, expect, it, Mock, vi } from "vitest";
// import { SessionProvider } from "../../context/AuthContext";
// import { getAuth } from "../../services/getAuth";
// import { Login } from "./Login";

// vi.mock("../../services/getAuth", () => ({
//   getAuth: vi.fn(),
// }));

// const mockGetAuth = getAuth as Mock;

// describe("<Login />", () => {
//   it("Debería mostrar un mensaje de error", async () => {
//     mockGetAuth.mockRejectedValue(new Error("Invalid credentials"));
//     render(
//       <SessionProvider>
//         <MemoryRouter>
//           <Login />
//         </MemoryRouter>
//       </SessionProvider>
//     );

//     const usernameInput = screen.getByPlaceholderText("Username");
//     const passwordInput = screen.getByPlaceholderText("Password");
//     const submitButton = screen.getByRole("button", { name: "Login" });

//     await act(() => {
//       fireEvent.change(usernameInput, { target: { value: "wrongUser" } });
//       fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });
//       fireEvent.click(submitButton);
//     });
//     const errorMessage = screen.findByText("Invalid credentials");
//     expect(errorMessage).toBeInTheDocument();
//   });
// });

import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, Mock, vi } from "vitest";
import { SessionProvider } from "../../context/AuthContext";
import { getAuth } from "../../services/getAuth";
import { Login } from "./Login";

vi.mock("../../services/getAuth", () => ({
  getAuth: vi.fn(),
}));

const mockGetAuth = getAuth as Mock;

describe("<Login />", () => {
  it("debería mostrar un mensaje de error", async () => {
    mockGetAuth.mockRejectedValue(new Error("Invalid credentials"));
    render(
      <SessionProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </SessionProvider>
    );
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const buttonLogin = screen.getByRole("button", { name: "Login" });
    await act(() => {
      fireEvent.change(usernameInput, { target: { value: "wrongUser" } });
      fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });
      fireEvent.click(buttonLogin);
    });
    const errorMessage = screen.getByText("Invalid credentials");
    expect(errorMessage).toBeInTheDocument();
  });
});
