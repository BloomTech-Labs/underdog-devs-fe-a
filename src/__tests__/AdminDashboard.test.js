import { cleanup } from '@testing-library/react';

afterEach(cleanup);

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => {
    return {
      authState: {
        isAuthenticated: true,
      },
      authService: {
        getUser: jest.fn(() => {
          return Promise.resolve({
            sub: '00ultx74kMUmEW8054x6',
            name: 'Test003 User',
            email: 'llama003@maildrop.cc',
            preferred_username: 'llama003@maildrop.cc',
            role: 2,
          });
        }),
      },
    };
  },
}));
// test to see if the dashboard renders

describe('Test', () => {
  beforeAll(() => {
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: function () {},
          removeListener: function () {},
        };
      };
  });

  test('Sanity Check', () => {
    console.log('foo bar');
  });
});
