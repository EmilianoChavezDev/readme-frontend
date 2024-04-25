import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "@/app/auth/login/page";
import { useRouter } from "next/router";
import useAuth from "../../../../__mocks__/hooks/useAuth";
import { UserProvider } from "../../../contexts/UserProvider";

jest.mock("next/router");
jest.mock("hooks/useAuth");

describe("Login and Home integration", () => {
  test("should logs in and login to home page after successful login", async () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({
      push: pushMock,
    });

    useAuth.mockImplementation(() => ({
      login: jest.fn().mockResolvedValueOnce({
        email: "usuario",
        token: "token_de_prueba",
      }),
    }));

    render(
      <UserProvider>
        <Login />
      </UserProvider>
    );

     // Busco los elementos de los inputs de login
     const emailInput = screen.getByLabelText("Email"); // Busco el input de email por su label
     const passwordInput = screen.getByLabelText("Contraseña"); // Busco el input de contraseña por su label
     const loginButton = screen.getByText("Iniciar Sesión");

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
    setTimeout(() => {
      expect(screen.getByText("Novedades")).toBeInTheDocument();
    }, 3000);
  });
});
