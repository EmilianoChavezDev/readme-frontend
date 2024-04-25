import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../../../app/auth/login/page";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

jest.mock("next/router");
jest.mock("@/hooks/useAuth");

describe("Login and Home integration", () => {
  test("should logs in and login to home page after successful login", async () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({
      push: pushMock,
    });

    useAuth.mockReturnValue({
      login: jest.fn().mockResolvedValueOnce({
        username: "usuario",
        token: "token_de_prueba",
      }),
    });

    render(<Login />);

    // Busco los elementos de los inputs de login
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("Login");

    // Simulo la escritura en los inputs
    fireEvent.change(emailInput, {
      target: { value: "jesusbordon@fiuni.edu.py" },
    });
    fireEvent.change(passwordInput, { target: { value: "ab123456" } });

    // Simulo hacer clic en el botón de login
    fireEvent.click(loginButton);

    // Esperar a que se complete el inicio de sesión y se ejecute la redirección
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/");
    });

    // Verifico que la información de usuario se haya cargado en la pagina de inicio
    expect(screen.getByText("Novedades")).toBeInTheDocument();
  });
});
