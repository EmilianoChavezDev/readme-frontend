import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Page from "../../app/auth/login/page";
import { UserProvider } from "@/contexts/UserProvider"; // Asegúrate de importar correctamente tu proveedor de usuario

describe("Página de Inicio de Sesión", () => {
  it("Iniciar Sesión y Redirección a la Página de Inicio", async () => {
    render(
      <UserProvider>
        <Page />
      </UserProvider>
    );

    // Simulo el llenado del formulario
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "usuario@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "contraseña123" },
    });

    // Envio el formulario simulado
    fireEvent.click(screen.getByText("Iniciar Sesión"));

    // Verifico que se redirija a la página de inicio ("/")
    expect(window.location.pathname).toBe("/"); // Verifico que la URL sea la raíz (/)

    // Espero a que se cargue el contenido de la página de inicio
    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText("Novedades")).toBeInTheDocument();
      }, 3000);
    });

    // Si funciona bien va mostrar estos elementos en el inicio
    setTimeout(() => {
      screen.getByText("Seguir Leyendo");
      screen.getByText("Navega por nuestras categorías");
    }, 3000);
  });
});
