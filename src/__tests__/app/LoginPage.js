import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "@/app/auth/login/page";
import UserProvider from "../../../__mocks__/contexts/UserProvider";

// Mocking hooks
jest.mock("react-hook-form", () => ({
  useForm: jest.fn(() => ({
    register: jest.fn(),
    handleSubmit: jest.fn((fn) => fn),
    watch: jest.fn(),
    formState: { errors: {} },
    reset: jest.fn(),
  })),
}));

jest.mock("../../../__mocks__/hooks/useAuth", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    data: null,
    error: null,
    loading: false,
    errorResponse: null,
    login: jest.fn(),
  })),
}));

describe("Login Page", () => {
  test("renders login form", () => {
    render(
      <UserProvider>
        <Page />
      </UserProvider>
    );

    // Verifica que el campo de email se renderice
    const emailField = screen.getByLabelText(/Email/i);
    expect(emailField).toBeInTheDocument();

    // Verifica que el campo de contraseña se renderice
    const passwordField = screen.getByLabelText(/Contraseña/i);
    expect(passwordField).toBeInTheDocument();

    // Verifica que el botón de iniciar sesión se renderice
    const loginButton = screen.getByText(/Iniciar Sesión/i);
    expect(loginButton).toBeInTheDocument();

    // Verifica que el link de "¿Olvidaste tu contraseña?" se renderice
    const forgotPasswordLink = screen.getByText(/¿Olvidaste tu contraseña?/i);
    expect(forgotPasswordLink).toBeInTheDocument();

    // Verifica que el link de registrarse se renderice
    const registerLink = screen.getByText(/¡Registrate!/i);
    expect(registerLink).toBeInTheDocument();
  });
});
