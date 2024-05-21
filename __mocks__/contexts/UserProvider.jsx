export const useUser = jest.fn(() => ({
  login: jest.fn(),
  logout: jest.fn(),
  refresh: jest.fn(),
  token: null,
  expiration: null,
  username: null,
  role: null,
  userId: null,
  profile: null,
  isOpen: false,
  setIsOpen: jest.fn(),
  isActualizado: false,
  setIsActualizado: jest.fn(),
  setProfileUpdate: jest.fn(),
  profileUpdate: false,
  unconfirmed_email: null,
}));

export const UserProvider = ({ children }) => <div>{children}</div>;

export default UserProvider;
