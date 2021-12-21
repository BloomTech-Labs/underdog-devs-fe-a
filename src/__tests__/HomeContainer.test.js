import React from 'react';
import { render, cleanup, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import HomeContainer from '../components/pages/Home/HomeContainer';
import createTestStore from '../__mocks__/CreateTestStore';
import { Provider } from 'react-redux';
import SkeletonLoadingComponent from '../components/common/SkeletonLoading';
import userEvent from '@testing-library/user-event';


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
            sub: '00ultwz1n9ORpNFc04x6',
            name: 'Test005 User',
            locale: 'en-US',
            email: 'llama005@maildrop.cc',
            preferred_username: 'llama005@maildrop.cc',
            given_name: 'Test005',
            family_name: 'User',
            zoneinfo: 'America/Los_Angeles',
            updated_at: 1599168716,
            email_verified: true,
            role: 5,
            isSubscribed: true,
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
        sub: '00ultwz1n9ORpNFc04x6',
        name: 'Test005 User',
        locale: 'en-US',
        email: 'llama005@maildrop.cc',
        preferred_username: 'llama005@maildrop.cc',
        given_name: 'Test005',
        family_name: 'User',
        zoneinfo: 'America/Los_Angeles',
        updated_at: 1599168716,
        email_verified: true,
        role: 5,
      },
    };
  }),
}));

describe('<HomeContainer /> test suite for pending role', () => {
  beforeEach(() => {
    localStorage.clear();
    store = createTestStore();
    localStorage.setItem('theme', 'dark');
  });
  test('it renders PendingApproval and limited Sidebar if role_id is 5', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <HomeContainer
            LoadingComponent={() => <SkeletonLoadingComponent />}
          />
        </Provider>
      );
    });
    const pendingText = await screen.findByText(
      /Hey Test005 User, currently your application is still pending. Please check back again soon!/i
    );
    const calendar = screen.queryByText(/Calendar/i);
    expect(calendar).toBeNull();
    expect(pendingText).toBeTruthy();
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
