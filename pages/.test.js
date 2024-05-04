import { render, screen } from "@testing-library/react";
import IndexPage from "./index";

test("renders the index page", () => {
  render(<IndexPage />);
  const titleElement = screen.getByText(/welcome to my app/i);
  expect(titleElement).toBeInTheDocument();
});
