import { renderHook } from "@testing-library/react-hooks";
import * as ReactRouter from "react-router-dom";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  Mock,
  MockInstance,
  vi,
} from "vitest";

import * as AuthContext from "../context/AuthContext";
import * as OrderServices from "../services/getOrders";
import { useOrders } from "./useOrders";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("useOrdersSpy", () => {
  let useSessionSpy: MockInstance;
  let getOrdersSpy: MockInstance;
  const mockNavigate = vi.fn();

  // Se ejecuta antes de cada caso de prueba
  beforeEach(() => {
    useSessionSpy = vi.spyOn(AuthContext, "useSession");
    getOrdersSpy = vi.spyOn(OrderServices, "getOrders");

    (ReactRouter.useNavigate as Mock).mockReturnValue(mockNavigate);

    // siempre hay que resetear los mocks antes de cada prueba
    vi.clearAllMocks();
  });

  // se ejecuta después de cada caso de prueba
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("debería mostrar un error", async () => {
    useSessionSpy.mockReturnValue({ user: { id: 1 } });
    getOrdersSpy.mockRejectedValue(new Error("Error"));
    const { result, waitForNextUpdate } = renderHook(() => useOrders());
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(
      "Failed to fetch orders. Please try again later."
    );
    expect(getOrdersSpy).toHaveBeenCalledTimes(1);
  });
});
