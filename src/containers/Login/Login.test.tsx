import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // esto corren en ambiente de pruebas
import { describe, expect, it, Mock, vi } from "vitest";
import { SessionProvider } from "../../context/AuthContext";
import { getAuth } from "../../services/getAuth";
import { Login } from "./Login";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // trae todas las propiedades del import que vamos a pasar
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../services/getAuth", () => ({
  getAuth: vi.fn(),
}));

const mockNavigate = vi.fn();
const mockGetAuth = getAuth as Mock;

describe("<Login />", () => {
  const handleLogin = () => {
    return render(
      <SessionProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </SessionProvider>
    );
  };

  it("Debería mostrar un mensaje de error", async () => {
    mockGetAuth.mockRejectedValue(new Error("Invalid credentials"));
    handleLogin();

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    await act(() => {
      fireEvent.change(usernameInput, { target: { value: "wrongUser" } });
      fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });
      fireEvent.click(submitButton);
    });
    const errorMessage = screen.getByText("Invalid credentials");
    expect(errorMessage).toBeInTheDocument();
  });

  it.skip("Debería redirigir a /orders si el login es exitoso", async () => {
    handleLogin();
  }); // skip para que no se ejecute

  it("Debería redirigir a /orders si el login es exitoso", async () => {
    mockGetAuth.mockResolvedValue({ success: true });
    handleLogin();
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    await act(() => {
      fireEvent.change(usernameInput, { target: { value: "validUser" } });
      fireEvent.change(passwordInput, { target: { value: "validPassword" } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockGetAuth).toHaveBeenCalledWith("validUser", "validPassword");
      expect(mockNavigate).toHaveBeenCalledWith("/orders");
    });
  });
});
