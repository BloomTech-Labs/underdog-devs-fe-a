import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import createTestStore from '../__mocks__/CreateTestStore';
import { Provider } from 'react-redux';
import Dashboard from '../components/pages/Dashboard/Dashboard';

afterEach(cleanup);
// creating store variable
let store;
// creating a mock useOktaAuth, needed this so we can log in
jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => {
    return {
      authState: {
        isAuthenticated: true,
      },
      authService: {
        getUser: jest.fn(() => {
          return Promise.resolve({
            sub: '00u13oned0U8XP8Mb4x7',
            name: 'Test008 User',
            email: 'llama008@maildrop.cc',
            preferred_username: 'llama008@maildrop.cc',
            role: 4,
          });
        }),
      },
    };
  },
}));
// creating a mock action
jest.mock('../state/actions/index', () => ({
  getUserProfile: jest.fn(() => {
    return {
      type: 'USER_PROFILE',
      payload: {
        sub: '00u13oned0U8XP8Mb4x7',
        name: 'Test008 User',
        email: 'llama008@maildrop.cc',
        preferred_username: 'llama008@maildrop.cc',
        role: 4,
      },
    };
  }),
}));

//Fixes error of "Cannot read proprties of  undefined (addListener)"

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    };
  };

describe('Mentee Dashboard test suite for mentee user role', () => {
  beforeEach(() => {
    localStorage.clear();
    // creating a mock redux store
    store = createTestStore();
    // setting the theme default theme to dark here, if you change it to light here, it will break the darkmode test
    // just have to fix the first expect to say the opposite of what you put
    localStorage.setItem('theme', 'dark');
  });

  test('it renders Mentee Dashboard and checks for dashboard title', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <Dashboard />
        </Provider>
      );
    });
    const dashboardTitle = await screen.findByText(/Tickets Dashboard/i);
    expect(dashboardTitle).toBeTruthy();
    expect(dashboardTitle).toBeInTheDocument();
    expect(dashboardTitle).toBeVisible();
  });

  test('it renders the dashboard and its container class', () => {
    act(() => {
      render(
        <Provider store={store}>
          <Dashboard />
        </Provider>
      );
    });
    const dashboardContainer = document.getElementsByClassName(
      'dashboard-container'
    );
    expect(dashboardContainer).toBeTruthy();
  });

  test('it renders all necessary tickets', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <Dashboard />
        </Provider>
      );
    });

    const escalationTickets = await screen.findByText(/Escalation Tickets/i);
    const applicationTickets = await screen.findByText(/Application Tickets/i);
    const resourceTickets = await screen.findByText(/Resource Tickets/i);

    expect(escalationTickets).toBeTruthy();
    expect(escalationTickets).toBeInTheDocument();
    expect(escalationTickets).toBeVisible();
    expect(applicationTickets).toBeTruthy();
    expect(applicationTickets).toBeInTheDocument();
    expect(applicationTickets).toBeVisible();
    expect(resourceTickets).toBeTruthy();
    expect(resourceTickets).toBeInTheDocument();
    expect(resourceTickets).toBeVisible();
  });

  test('the amounts associated with each ticket type are all there and a value', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <Dashboard />
        </Provider>
      );
    });

    const ticketTypeAmounts = document.getElementsByClassName(
      'ant-statistic-content-value-int'
    );
    expect(ticketTypeAmounts).toHaveLength(3);
    expect(ticketTypeAmounts[0].textContent).not.toBeNaN();
    expect(ticketTypeAmounts[1].textContent).not.toBeNaN();
    expect(ticketTypeAmounts[2].textContent).not.toBeNaN();
  });

  test('all necessary columns within table are rendered', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <Dashboard />
        </Provider>
      );
    });

    const ticketID = await screen.findByText(/Ticket ID/i);
    const message = await screen.findByText(/Message/i);
    const dateSubmitted = await screen.findByText(/Date Submitted/i);

    expect(ticketID).toBeTruthy();
    expect(ticketID).toBeInTheDocument();
    expect(ticketID).toBeVisible();
    expect(message).toBeTruthy();
    expect(message).toBeInTheDocument();
    expect(message).toBeVisible();
    expect(dateSubmitted).toBeTruthy();
    expect(dateSubmitted).toBeInTheDocument();
    expect(dateSubmitted).toBeVisible();
  });

  test('Asserts that the selected mode is dark', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <Dashboard />
        </Provider>
      );
    });
    expect(localStorage.theme).toBe('dark');
  });
});
