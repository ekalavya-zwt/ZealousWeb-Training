import { renderHook, act } from "@testing-library/react";
import useLocalStorage from "../../hooks/useLocalStorage";

test("returns initial value on first render", () => {
  const { result } = renderHook(() => useLocalStorage("test", "hello"));

  expect(result.current[0]).toBe("hello");
});

test("setValue updates localStorage", () => {
  const { result } = renderHook(() => useLocalStorage("test", "hello"));

  act(() => {
    result.current[1]("world");
  });

  expect(result.current[0]).toBe("world");

  expect(JSON.parse(localStorage.getItem("test"))).toBe("world");
});

test("reads existing value from localStorage", () => {
  localStorage.setItem("test", JSON.stringify("stored"));

  const { result } = renderHook(() => useLocalStorage("test", "hello"));

  expect(result.current[0]).toBe("stored");
});
