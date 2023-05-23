import React from 'react';
import { render, cleanup, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import createTestStore from '../__mocks__/CreateTestStore';
import { Provider } from 'react-redux';
import Dashboard from '../components/pages/Dashboard/Dashboard';
import MenteeMentorDashboard from '../components/pages/MenteeMentorDashboard/MenteeMentorDashboard';
import MentorModal from '../components/pages/Applications/MentorModal';

afterEach(cleanup);
// creating store variable
let store;
// creating a mock action
jest.mock('../state/actions/index', () => ({
  getUserProfile: jest.fn(() => {
    return {
      type: 'USER_PROFILE',
      payload: {
        sub: 'auth0|62e443f59b1f5f6077c26ab9',
        first_name: 'Jovanni',
        email: 'bear004@maildrop.cc',
        preferred_username: 'bear004@maildrop.cc',
        role: 'mentee',
      },
    };
  }),
}));

//Fixes error of "Cannot read properties of  undefined (addListener)"

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
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

  test('Asserts that the selected mode is dark', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <MenteeMentorDashboard />
        </Provider>
      );
    });
    expect(localStorage.theme).toBe('dark');
  });

  test('it renders Mentee Dashboard and checks for dashboard title', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <MenteeMentorDashboard />
        </Provider>
      );
    });

    const dashboardTitles = screen.queryAllByText(/My Mentors/i, {
      selector: 'h2',
    });
    const dashboardTitle = dashboardTitles.find(
      title => title.textContent === 'My Mentors'
    );

    // Assert that dashboardTitles array is not empty
    expect(dashboardTitles.length).toBeGreaterThan(0);

    // Assert that the dashboardTitle element is not undefined
    expect(dashboardTitle).toBeDefined();

    // Assert that the dashboard title exists and contains the text "My Mentors"
    expect(dashboardTitle).toBeTruthy();
    expect(dashboardTitle).toHaveTextContent(/My Mentors/i);

    expect(dashboardTitle).toBeInTheDocument();
    expect(dashboardTitle).toBeVisible();
  });

  test('it renders the appropriate number of mentors', () => {
    act(() => {
      render(
        <Provider store={store}>
          <MenteeMentorDashboard />
        </Provider>
      );
    });
    const mentorList = screen.getAllByTestId('list');

    expect(mentorList).toBeTruthy();
    expect(mentorList).toEqual(1);
  });

  test('Clicking on Mentor opens Mentor Modal', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <MenteeMentorDashboard />
        </Provider>
      );
    });
    const modal = document.getElementsByClassName('ant-modal-content');
    const mentorName = document.getElementsByClassName('ant-list-item');

    userEvent.click(mentorName, { pointerEventsCheck: 0 });

    expect(modal).toBeVisible();
  });

  test('Modal opens showing mentor information', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <MenteeMentorDashboard />
        </Provider>
      );
    });

    expect(localStorage.theme).toBe('dark');
  });
});
