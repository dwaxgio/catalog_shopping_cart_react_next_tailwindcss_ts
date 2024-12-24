import { render, screen } from "@testing-library/react";
import CatalogPage from "../src/app/page";
import "@testing-library/jest-dom"; 

describe("CatalogPage", () => {
  it("renders the CatalogPage component", () => {
    render(<CatalogPage />);
    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toBeInTheDocument();
  });
});
