import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("<Button />", () => {
  // el nombre indica que es un componente
  it("should render correctly button", () => {
    render(<Button label="Click" />);
    const button = screen.getByText("Click");
    expect(button).toBeInTheDocument(); // existe en el documento
  });

  it("debería llamar a la función onClick", async () => {
    // Arrange
    const handleClick = vi.fn();
    render(<Button label="Click" onClick={handleClick} />);
    const button = screen.getByText("Click");
    // Act
    await act(() => {
      fireEvent.click(button);
    });
    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
