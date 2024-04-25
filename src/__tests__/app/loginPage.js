import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { UserProvider } from "../../contexts/UserProvider";
import Page from "../../app/auth/login/page";

jest.mock("next/router");

describe("Login", () => {
  it("renders the user login page", () => {
    render(
      <UserProvider>
        <Page />
      </UserProvider>
    );

    // Verifica que el texto "No tienes cuenta" esté presente en la página
    const heading = screen.getByText(/No tienes cuenta/i);

    expect(heading).toBeInTheDocument();
  });
});
