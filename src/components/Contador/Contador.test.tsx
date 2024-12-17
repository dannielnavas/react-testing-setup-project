import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Contador } from "./Contador";

describe("<Contador />", () => {
  it("Debería mostrar el valor inicial ", () => {
    render(<Contador />);
    const contador = screen.getByText("Contador: 0");
    expect(contador).toBeInTheDocument();
  });

  it("Debería incrementar el contador", async () => {
    render(<Contador />);
    const button = screen.getByText("Incrementar");
    await act(() => {
      fireEvent.click(button);
    });
    const contador = screen.getByText("Contador: 1");
    expect(contador).toBeInTheDocument();
  });
});