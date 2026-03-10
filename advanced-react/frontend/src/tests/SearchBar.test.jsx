import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../SearchBar";

test("typing calls onChange", async () => {
  const user = userEvent.setup();
  const mockChange = vi.fn();

  render(<SearchBar value="" onChange={mockChange} />);

  const input = screen.getByRole("textbox");

  await user.type(input, "John");

  expect(mockChange).toHaveBeenCalled();
});

test("clear button appears when input has value", () => {
  render(<SearchBar value="John" onChange={() => {}} />);

  expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
});

test("clicking clear resets input", async () => {
  const user = userEvent.setup();
  const mockChange = vi.fn();

  render(<SearchBar value="John" onChange={mockChange} />);

  const clearButton = screen.getByRole("button", { name: /clear/i });

  await user.click(clearButton);

  expect(mockChange).toHaveBeenCalledWith("");
});
