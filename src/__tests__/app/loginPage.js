import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../../app/auth/login/page";

describe("Login", () => {
  it("renders the user login page", () => {
    render(<Page />);

    // Verifica que el texto "No tienes cuenta" esté presente en la página
    const heading = screen.getByText(/No tienes cuenta/i);

    expect(heading).toBeInTheDocument();
  });
});
