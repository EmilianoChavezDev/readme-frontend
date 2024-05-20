export const useAuth = jest.fn(() => ({
  data: null,
  error: null,
  loading: false,
  errorResponse: null,
  login: jest.fn(),
}));
