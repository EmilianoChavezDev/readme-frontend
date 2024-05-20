import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Page from '../../app/auth/login/page';
import useAuth from '@/hooks/useAuth';
import { useUser } from '@/contexts/UserProvider';
import useUnbanAccount from '@/hooks/useUnbanAccount';

// Mockear los hooks
jest.mock('../../hooks/useAuth');
jest.mock('../../contexts/UserProvider');
jest.mock('../../hooks/useUnbanAccount');

describe('Login Page', () => {
  beforeEach(() => {
    // Definir las implementaciones de los mocks
    useAuth.mockReturnValue({
      data: null,
      error: null,
      loading: false,
      errorResponse: null,
      login: jest.fn(),
    });

    useUser.mockReturnValue({
      login: jest.fn(),
    });

    useUnbanAccount.mockReturnValue({
      request_Unban: jest.fn(),
      isLoading: false,
      error: null,
    });
  });

  it('should render the login form with all elements', () => {
    render(<Page />);

    // Verificar que los campos de email y contraseña están presentes
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();

    // Verificar que el botón de login está presente
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();

    // Verificar que el enlace de "¿Olvidaste tu contraseña?" está presente
    expect(screen.getByText('¿Olvidaste tu contraseña?')).toBeInTheDocument();

    // Verificar que el enlace de "¡Registrate!" está presente
    expect(screen.getByText('¡Registrate!')).toBeInTheDocument();
  });

  it('should show an error message if errorResponse exists', () => {
    useAuth.mockReturnValueOnce({
      data: null,
      error: null,
      loading: false,
      errorResponse: { error: 'Error message' },
      login: jest.fn(),
    });

    render(<Page />);

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });


});
