import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import HomeContainer from '../components/pages/Home/HomeContainer';
import createTestStore from './Mocks/CreateTestStore';
import { Provider } from 'react-redux';
import { getUserProfile as mockGetUserProfile } from '../state/actions/index';

// const userInfo = {
//   sub: '00ultx74kMUmEW8054x6',
//   name: 'Test005 User',
//   locale: 'en-US',
//   email: 'llama005@maildrop.cc',
//   preferred_username: 'llama005@maildrop.cc',
//   given_name: 'Test005',
//   family_name: 'User',
//   zoneinfo: 'America/Los_Angeles',
//   updated_at: 1599168716,
//   email_verified: true,
//   role: 5,
//   isSubscribed: true,
// };

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

describe('<HomeContainer /> test suite', () => {
  beforeEach(() => {
    store = createTestStore();
    localStorage.setItem('theme', 'dark');
  });
  test('it renders PendingApproval if role_id is 5', async () => {
    localStorage.setItem('role_id', '5');
    act(() => {
      render(
        <Provider store={store}>
          <HomeContainer />
        </Provider>
      );
    });
    const pendingText = await screen.findByText(
      /Hey Test005 User, currently your application is still pending. Please check back again soon!/i
    );
    expect(pendingText).toBeInTheDocument();
  });
});
