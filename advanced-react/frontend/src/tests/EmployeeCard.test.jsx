import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EmployeeCard from "../EmployeeCard";

const employee = {
  id: 1,
  first_name: "John",
  last_name: "Doe",
  email: "john@company.com",
  department: "Engineering",
  salary: 75000,
  isActive: true,
};

test("renders employee information", () => {
  render(<EmployeeCard employee={employee} onDelete={() => {}} />);

  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("john@company.com")).toBeInTheDocument();
  expect(screen.getByText("Engineering")).toBeInTheDocument();
});

test("formats salary correctly", () => {
  render(<EmployeeCard employee={employee} onDelete={() => {}} />);

  expect(screen.getByText("$75,000")).toBeInTheDocument();
});

test("shows active badge", () => {
  render(<EmployeeCard employee={employee} onDelete={() => {}} />);

  expect(screen.getByText(/active/i)).toBeInTheDocument();
});

test("shows inactive badge", () => {
  const inactiveEmployee = { ...employee, isActive: false };

  render(<EmployeeCard employee={inactiveEmployee} onDelete={() => {}} />);

  expect(screen.getByText(/inactive/i)).toBeInTheDocument();
});

test("delete button calls onDelete with id", async () => {
  const user = userEvent.setup();
  const mockDelete = vi.fn();

  render(<EmployeeCard employee={employee} onDelete={mockDelete} />);

  const button = screen.getByRole("button", { name: /delete/i });

  await user.click(button);

  expect(mockDelete).toHaveBeenCalledWith(1);
});
