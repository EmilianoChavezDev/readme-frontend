import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useUser } from "../../../contexts/UserProvider";
import Page from "../../../app/accounts/edit/[id]/page";
import { useRouter } from "next/navigation";
import { act  } from "react-dom/test-utils";

// Mock de las dependencias necesarias
jest.mock("../../../contexts/UserProvider", () => ({
  useUser: jest.fn(() => ({
    refresh: jest.fn(),
    setProfileUpdate: jest.fn(),
  })),
}));

jest.mock("../../../hooks/useUser", () =>
  jest.fn(() => ({
    getUserInformation: jest.fn(),
    data: {
      username: "test_user",
      fecha_de_nacimiento: "1990-01-01",
    },
    loading: false,
    updateUsername: jest.fn(),
    currentData: {},
    updatePassword: jest.fn(),
    isError: false,
    isTrue: true,
    message: "",
  }))
);

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe("Edit Profile Page", () => {
  it("renders the user information edit page", async () => {
    await act(async () => {
      render(<Page params={{ id: "test_user" }} />);
    });
  

    // Verifica que la página de carga no esté presente
    const loader = screen.queryByTestId("loader");
    expect(loader).not.toBeInTheDocument();

    // Verifica que el título esté presente
    const title = screen.getByText(/Editar Perfil/i);
    expect(title).toBeInTheDocument();

    // Verifica que los campos estén presentes y tengan los valores adecuados
    const usernameField = screen.getByLabelText(/Nombre de usuario/i);
    expect(usernameField).toBeInTheDocument();
    expect(usernameField).toHaveValue("test_user");

    const oldPasswordField = screen.getByLabelText(/Contraseña/i);
    expect(oldPasswordField).toBeInTheDocument();

    const newPasswordField = screen.getByLabelText(/Nueva Contraseña/i);
    expect(newPasswordField).toBeInTheDocument();

    const confirmPasswordField = screen.getByLabelText(
      /Confirmar Nueva Contraseña/i
    );
    expect(confirmPasswordField).toBeInTheDocument();

    // Verifica que los botones estén presentes
    const cancelButton = screen.getByText(/Cancelar/i);
    expect(cancelButton).toBeInTheDocument();

    const saveButton = screen.getByText(/Guardar cambios/i);
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeDisabled(); // Debería estar desactivado hasta que se realicen cambios

    // Simula un cambio en el campo de nombre de usuario
    fireEvent.change(usernameField, { target: { value: "new_test_user" } });

    // Verifica que el botón de guardar cambios ahora esté habilitado
    expect(saveButton).not.toBeDisabled();

    // Simula el envío del formulario
    fireEvent.click(saveButton);

    // Verifica que las funciones de actualización se hayan llamado correctamente
    const { updateUsername } = useUser();
    expect(updateUsername).toHaveBeenCalledWith("new_test_user", "");

    // Verifica que se haya llamado a la función push del router
    const { push } = useRouter();
    expect(push).toHaveBeenCalled();
  });
});
