import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Accordion from "../Accordion";

test("body hidden by default", () => {
  render(
    <Accordion title="Details">
      <p>Hidden content</p>
    </Accordion>,
  );

  expect(screen.queryByText("Hidden content")).not.toBeInTheDocument();
});

test("clicking header reveals content", async () => {
  const user = userEvent.setup();

  render(
    <Accordion title="Details">
      <p>Hidden content</p>
    </Accordion>,
  );

  const header = screen.getByText("Details");

  await user.click(header);

  expect(screen.getByText("Hidden content")).toBeInTheDocument();
});

test("clicking header again hides content", async () => {
  const user = userEvent.setup();

  render(
    <Accordion title="Details">
      <p>Hidden content</p>
    </Accordion>,
  );

  const header = screen.getByText("Details");

  await user.click(header);
  await user.click(header);

  expect(screen.queryByText("Hidden content")).not.toBeInTheDocument();
});
