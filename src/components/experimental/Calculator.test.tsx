// TDT = Table-Driven Test

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Calculator } from "./Calculator";

describe("< Calculator />", () => {
  const useCasesTest = [
    { a: 2, b: 2, operation: "add", expected: 4 },
    { a: 2, b: 2, operation: "subtract", expected: 0 },
    { a: 2, b: 2, operation: "multiply", expected: 4 },
    { a: 2, b: 2, operation: "divide", expected: 1 },
    { a: 2, b: 0, operation: "divide", expected: "Error" },
    { a: 2, b: 2, operation: "invalid", expected: "Invalid operation" },
  ]; // esto se hace por la metodología TDT

  // este caso de prueba se ejecutará 6 veces con los escenarios de arriba
  it.each(useCasesTest)(
    "debería retornar $expected cuando $a y $b son $operation",
    ({ a, b, operation, expected }) => {
      render(<Calculator a={a} b={b} operation={operation} />);
      const result = screen.getByText(`Result: ${expected}`);
      expect(result).toBeInTheDocument();
    }
  );
});
