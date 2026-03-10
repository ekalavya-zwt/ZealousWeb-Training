import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import useAsync from "../../hooks/useAsync";

test("status starts as idle", () => {
  const asyncFn = vi.fn();

  const { result } = renderHook(() => useAsync(asyncFn));

  expect(result.current.status).toBe("idle");
});

test("status becomes loading while running", async () => {
  const asyncFn = () => new Promise((resolve) => setTimeout(resolve, 100));

  const { result } = renderHook(() => useAsync(asyncFn));

  act(() => {
    result.current.execute();
  });

  expect(result.current.status).toBe("loading");
});

test("status becomes success when resolved", async () => {
  const asyncFn = vi.fn().mockResolvedValue("data");

  const { result } = renderHook(() => useAsync(asyncFn));

  await act(async () => {
    await result.current.execute();
  });

  expect(result.current.status).toBe("success");
  expect(result.current.data).toBe("data");
});

test("status becomes error when promise rejects", async () => {
  const asyncFn = vi.fn().mockRejectedValue(new Error("fail"));

  const { result } = renderHook(() => useAsync(asyncFn));

  await act(async () => {
    await result.current.execute();
  });

  expect(result.current.status).toBe("error");
});

test("execute can re-run async function", async () => {
  const asyncFn = vi.fn().mockResolvedValue("data");

  const { result } = renderHook(() => useAsync(asyncFn));

  await act(async () => {
    await result.current.execute();
    await result.current.execute();
  });

  expect(asyncFn).toHaveBeenCalledTimes(2);
});
