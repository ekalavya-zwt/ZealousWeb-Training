import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";
import AddEmployee from "../AddEmployee";

test("submits form and creates employee", async () => {
  const user = userEvent.setup();

  render(<AddEmployee />);

  await user.type(screen.getByLabelText(/first name/i), "Alice");
  await user.type(screen.getByLabelText(/last name/i), "Brown");

  await user.click(screen.getByRole("button", { name: /submit/i }));

  expect(await screen.findByText("Alice Brown")).toBeInTheDocument();
});

test("shows error message when API fails", async () => {
  server.use(
    http.get("/api/employees", () =>
      HttpResponse.json({ message: "Server error" }, { status: 500 }),
    ),
  );

  render(<EmployeeList />);

  expect(
    await screen.findByText(/error loading employees/i),
  ).toBeInTheDocument();
});
