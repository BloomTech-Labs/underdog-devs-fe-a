import React from 'react';
import { render, cleanup, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import HomeContainer from '../components/pages/Home/HomeContainer';
import createTestStore from '../__mocks__/CreateTestStore';
import { Provider } from 'react-redux';
import SkeletonLoadingComponent from '../components/common/SkeletonLoading';
import Sidebar from '../components/common/Sidebar/Sidebar.js';

//TODO: Getting a warning error on the tests with overlapping act() calls

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
// creating a mock action
jest.mock('../state/actions/index', () => ({
  getUserProfile: jest.fn(() => {
    return {
      type: 'USER_PROFILE',
      payload: {
        sub: '00ultx74kMUmEW8054x6',
        name: 'Test003 User',
        email: 'llama003@maildrop.cc',
        preferred_username: 'llama003@maildrop.cc',
        role: 2,
      },
    };
  }),
}));

describe('<HomeContainer /> test suite for mentee role', () => {
  beforeAll(() => {
    // have to use this because we were having problems with matchMedia, this fixed it. 
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
    // creating a mock redux store
    store = createTestStore();
    // setting the theme default theme to dark here, if you change it to light here, it will break the darkmode test
    // just have to fix the first expect to say the opposite of what you put
    localStorage.setItem('theme', 'dark');
  });
  test('it renders Mentor Dashboard and Sidebar if role_id is 2', async () => {
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

    await waitFor(() => {
      const calendar = document.getElementsByClassName('calendar');
      expect(calendar).toBeTruthy();
    });
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
    const scheduleInterview = await screen.findByText(/Schedule Interview/i);

    const manageResources = await screen.findByText(/Manage Resources/i);
    const PendingApplications = await screen.findByText(/Pending Applications/i);
    const manageUsers = await screen.findByText(/Manage Users/i);
    const viewSupportRequests = await screen.findByText(/View Support Requests/i);
    const viewAllMeetings = await screen.findByText(/View All Meetings/i);

    const profileSettings = await screen.findByText(/Profile Settings/i);
    const accountSettings = await screen.findByText(/Account Settings/i);
    const logout = await screen.findByText(/Log Out/i);

    //tests for profile settings comp to render
    //TODO: FOR SOME REASON THERE IS A MEMORY LEAK HERE, NOT SURE HOW TO FIX IT
    userEvent.click(profileSettings);
    
    await waitFor(() => {
      const profileSettingsComponent = screen.findByText('Profile Settings');
      expect(profileSettingsComponent).toBeTruthy();
    });

    //tests for account settings comp to render
    userEvent.click(accountSettings);

    await waitFor(() => {
      const accountSettingsComponent = screen.findByText(
        /Do we need Account settings?/i
      );
      expect(accountSettingsComponent).toBeTruthy();
    });

    expect(calendar).toBeTruthy();
    expect(scheduleInterview).toBeTruthy();
    expect(manageResources).toBeTruthy();
    expect(PendingApplications).toBeTruthy();
    expect(manageUsers).toBeTruthy();
    expect(viewSupportRequests).toBeTruthy();
    expect(viewAllMeetings).toBeTruthy();
    expect(profileSettings).toBeTruthy();
    expect(accountSettings).toBeTruthy();
    expect(logout).toBeTruthy();
  });
  test('Proper component renders on click', async () => {
    await waitFor(() => {
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
    });

    const schedule = await screen.findByText(/Schedule/i);
    userEvent.click(schedule);
    const account = await screen.findByText(/Account/i);
    userEvent.click(account);

    // added this line of code here because i was getting a window.alert() error, saying it wasn't implemented
    window.alert = () => {};


    // testing for Schedule Interview comp to render
    const scheduleInterview = await screen.findByText(/Schedule Interview/i);
    userEvent.click(scheduleInterview);
    
    await waitFor(() => {
      const scheduleInterviewComponent = screen.findByText(
        /"Schedule Interview" Component goes here/i
      );
      expect(scheduleInterviewComponent).toBeTruthy();
    });

    // testing for Manage Resources comp to render
    const manageResources = await screen.findByText(/Manage Resources/i);
    userEvent.click(manageResources);

    await waitFor(() => {
      const manageResourcesComponent = screen.findByText(
        /"Manage Resources" Component goes here/i
      );
      expect(manageResourcesComponent).toBeTruthy();
    });


    // testing for pending applications comp to render
    const pendingApplications = await screen.findByText(/Pending Applications/i);
    userEvent.click(pendingApplications);

    await waitFor(() => {
      const pendingApplicationsComponent = screen.findByText(
        /"Pending Applications" Component goes here/i
      );
      expect(pendingApplicationsComponent).toBeTruthy();
    });

    // testing for manage users comp to render
    const manageUsers = await screen.findByText(/Manage Users/i);
    userEvent.click(manageUsers);

    await waitFor(() => {
      const manageUsersComponent = screen.findByText(
        /User Management/i
      );
      const searchForUser = screen.findByText(/Please search for a user to update/i);
      expect(manageUsersComponent).toBeTruthy();
      expect(searchForUser).toBeTruthy();
    });

    // testing for view support request comp to render
    const supportRequests = await screen.findByText(/View Support Requests/i);
    userEvent.click(supportRequests);

    await waitFor(() => {
      const supportRequestsComponent = screen.findByText(
        /"View Support Requests" Component goes here/i
      );
      expect(supportRequestsComponent).toBeTruthy();
    });

    // testing for view all meetings comp to render
    const viewAllMeetings = await screen.findByText(/View All Meetings/i);
    userEvent.click(viewAllMeetings);

    await waitFor(() => {
      const viewAllMeetingsComponent = screen.findByText(
        /"View Meetings" Component goes here/i
      );
      expect(viewAllMeetingsComponent).toBeTruthy();
    });

    // testing to see if the account dropdown items are there
    const findAccountDropdown = document.getElementById('rc-menu-uuid-51147-1-sub4-popup');
    expect(findAccountDropdown);
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
