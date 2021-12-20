import React from 'react';
import { render, cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import HomeContainer from '../components/pages/Home/HomeContainer';
import createTestStore from '../__mocks__/CreateTestStore';
import { Provider } from 'react-redux';
import { getUserProfile as mockGetUserProfile } from '../state/actions/index';
import SkeletonLoadingComponent from '../components/common/SkeletonLoading';
import Sidebar from '../components/common/Sidebar/Sidebar.js';
import RenderUpdateProfile from '../components/pages/UpdateProfile/RenderUpdateProfile.js';

afterEach(cleanup);
let store;
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

describe('<HomeContainer /> test suite for mentee role', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  beforeEach(() => {
    localStorage.clear();
    store = createTestStore();
    localStorage.setItem('theme', 'dark');
  });
  test('it renders Mentee Dashboard and Sidebar if role_id is 4', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <HomeContainer
            LoadingComponent={() => <SkeletonLoadingComponent />}
            Sidebar={() => <Sidebar />}
          />
        </Provider>
      );
    });
    const schedule = await screen.findByText(/Schedule/i);
    expect(schedule).toBeTruthy();
  });
  test('it renders Calendar component', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <HomeContainer
            LoadingComponent={() => <SkeletonLoadingComponent />}
            Sidebar={() => <Sidebar />}
          />
        </Provider>
      );
    });
    const calendar = document.getElementsByClassName('calendar');
    expect(calendar).toBeTruthy();
  });
  test('Sidebar dropdown menu displays proper menus on click', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <HomeContainer
            LoadingComponent={() => <SkeletonLoadingComponent />}
            Sidebar={() => <Sidebar />}
          />
        </Provider>
      );
    });
    const schedule = await screen.findByText(/Schedule/i);
    userEvent.click(schedule);
    const account = await screen.findByText(/Account/i);
    userEvent.click(account);

    const calendar = await screen.findByText(/Calendar/i);
    const profileSettings = await screen.findByText(/Profile Settings/i);
    const accountSettings = await screen.findByText(/Account Settings/i);
    const logout = await screen.findByText(/Log Out/i);

    expect(calendar).toBeTruthy();
    expect(profileSettings).toBeTruthy();
    expect(accountSettings).toBeTruthy();
    expect(logout).toBeTruthy();
  });
  test('Proper component renders on click', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <HomeContainer
            LoadingComponent={() => <SkeletonLoadingComponent />}
            Sidebar={() => (
              <Sidebar RenderUpdateProfile={() => <RenderUpdateProfile />} />
            )}
          />
        </Provider>
      );
    });
    const schedule = await screen.findByText(/Schedule/i);
    userEvent.click(schedule);
    const account = await screen.findByText(/Account/i);
    userEvent.click(account);

    // testing for upcoming meetings comp to render
    const upcomingMeetings = await screen.findByText(/Upcoming Meetings/i);
    userEvent.click(upcomingMeetings);

    const upcomingMeetingsComponent = await screen.findByText(
      /"Upcoming Meetings" Component goes here/i
    );
    expect(upcomingMeetingsComponent).toBeTruthy();

    // testing for my assignemnts comp to render
    const myAssignments = await screen.findByText(/My Assignments/i);
    userEvent.click(myAssignments);

    const myAssignmentsComponent = await screen.findByText(
      /"My Assignments" Component goes here/i
    );
    expect(myAssignmentsComponent).toBeTruthy();

    // testing for Access Resources comp to render
    const accessResources = await screen.findByText(/Access Resources/i);
    userEvent.click(accessResources);

    const accessResourcesComponent = await screen.findByText(
      /"Access Resources" Component goes here/i
    );
    expect(accessResourcesComponent).toBeTruthy();

    //tests for profile settings comp to render
    const profileSettings = await screen.findByText(/Profile Settings/i);
    userEvent.click(profileSettings);

    const profileSettingsComponent = document.getElementsByClassName(
      'flexContainer'
    );
    expect(profileSettingsComponent).toBeTruthy();

    //tests for account settings comp to render
    const accountSettings = await screen.findByText(/Account Settings/i);
    userEvent.click(accountSettings);

    const accountSettingsComponent = await screen.findByText(
      /Do we need Account settings?/i
    );
    expect(accountSettingsComponent).toBeTruthy();
  });
  test('Tests darkmode functionallity for user role', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <HomeContainer
            LoadingComponent={() => <SkeletonLoadingComponent />}
          />
        </Provider>
      );
    });
      const darkModeToggleBtn = await screen.findByRole("switch");
      const darkModeToggleBtnClass = document.getElementsByClassName("ant-switch ant-switch-small ant-switch-checked");
      expect(darkModeToggleBtn).toBeInTheDocument();
      expect(darkModeToggleBtnClass).toBeTruthy();
      expect(localStorage.theme).toBe('dark');

      userEvent.click(darkModeToggleBtn);

      await waitFor(()=> {
        const darkModeToggleBtnClass = document.getElementsByClassName("ant-switch ant-switch-small ant-switch");
        expect(darkModeToggleBtnClass).toBeTruthy();
        expect(localStorage.theme).toBe('light');
      });
  });
});
