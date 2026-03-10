import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import useDebounce from "../../hooks/useDebounce";

test("returns initial value immediately", () => {
  const { result } = renderHook(() => useDebounce("hello", 500));

  expect(result.current).toBe("hello");
});

test("does not update before delay expires", () => {
  vi.useFakeTimers();

  const { result, rerender } = renderHook(
    ({ value }) => useDebounce(value, 500),
    { initialProps: { value: "hello" } },
  );

  rerender({ value: "world" });

  expect(result.current).toBe("hello");

  vi.advanceTimersByTime(300);

  expect(result.current).toBe("hello");
});

test("updates after delay elapses", () => {
  vi.useFakeTimers();

  const { result, rerender } = renderHook(
    ({ value }) => useDebounce(value, 500),
    { initialProps: { value: "hello" } },
  );

  rerender({ value: "world" });

  vi.advanceTimersByTime(500);

  expect(result.current).toBe("world");
});

test("resets timer on rapid value change", () => {
  vi.useFakeTimers();

  const { result, rerender } = renderHook(
    ({ value }) => useDebounce(value, 500),
    { initialProps: { value: "a" } },
  );

  rerender({ value: "b" });
  vi.advanceTimersByTime(300);

  rerender({ value: "c" });

  vi.advanceTimersByTime(500);

  expect(result.current).toBe("c");
});
