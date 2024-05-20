// __mocks__/next/router.js
const useRouter = jest.fn();
useRouter.mockImplementation(() => ({
  push: jest.fn(),
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  beforePopState: jest.fn(() => null),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
}));

module.exports = {
  useRouter,
};
