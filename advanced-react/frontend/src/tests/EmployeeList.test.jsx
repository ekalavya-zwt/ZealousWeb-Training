import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EmployeeList from "../EmployeeList";

test("shows skeleton while loading", () => {
  render(<EmployeeList />);

  expect(screen.getByTestId("skeleton-table")).toBeInTheDocument();
});

test("renders employee rows after loading", async () => {
  render(<EmployeeList />);

  expect(await screen.findByText("John Doe")).toBeInTheDocument();
  expect(await screen.findByText("Jane Smith")).toBeInTheDocument();
});

test("search filters employees", async () => {
  const user = userEvent.setup();

  render(<EmployeeList />);

  const input = await screen.findByRole("textbox");

  await user.type(input, "John");

  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
});

test("clearing search restores all employees", async () => {
  const user = userEvent.setup();

  render(<EmployeeList />);

  const input = await screen.findByRole("textbox");

  await user.type(input, "John");

  await user.clear(input);

  expect(await screen.findByText("Jane Smith")).toBeInTheDocument();
});
