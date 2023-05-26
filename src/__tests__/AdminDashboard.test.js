import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import createTestStore from '../__mocks__/CreateTestStore';
import { Provider } from 'react-redux';
import Applications from '../components/pages/Applications/Applications';

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
            sub: 'auth0|62e4439b9b1f5f6077c26aab',
            name: 'bear001@maildrop.cc',
            email: 'bear001@maildrop.cc',
            preferred_username: 'bear001@maildrop.cc',
            role: 'admin',
          });
        }),
      },
    };
  },
}));

describe('Test', () => {
  beforeAll(() => {
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: function () { },
          removeListener: function () { },
        };
      };
  });

  test('Sanity Check', () => {
    console.log('foo bar');
  });
});

describe('Admin Dashboard Test Suite', () => {
  beforeEach(() => {
    localStorage.clear();
    // creating a mock redux store
    const store = createTestStore();
    // setting the theme default theme to dark here, if you change it to light here, it will break the darkmode test
    // just have to fix the first expect to say the opposite of what you put
    localStorage.setItem('theme', 'dark');
  });

  test('Asserts that the selected mode is dark', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <Applications />
        </Provider>
      );
    });
    expect(localStorage.theme).toBe('dark');
  });

  test('it renders Applications and checks for title', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <Applications />
        </Provider>
      );
    });

    const dashboardTitles = screen.queryAllByText(/Applications/i, {
      selector: 'h2',
    });
    const dashboardTitle = dashboardTitles.find(
      title => title.textContent === 'Applications'
    );

    // Assert that dashboardTitles array is not empty
    expect(dashboardTitles.length).toBeGreaterThan(0);

    // Assert that the dashboardTitle element is not undefined
    expect(dashboardTitle).toBeDefined();

    // Assert that the dashboard title exists and contains the text "My Mentors"
    expect(dashboardTitle).toBeTruthy();
    expect(dashboardTitle).toHaveTextContent(/Applications/i);

    expect(dashboardTitle).toBeInTheDocument();
    expect(dashboardTitle).toBeVisible();
  });

  test('Pending toggle is visible', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <Applications />
        </Provider>
      );
    });

    const pendingToggle = document.getElementsByClassName('pendingToggle')

    expect(pendingToggle).toBeVisible();
    expect(pendingToggle).toBeTruthy();
    expect(pendingToggle).toBeInTheDocument();
  });
});