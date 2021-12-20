import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import HomeContainer from '../components/pages/Home/HomeContainer';
import createTestStore from '../__mocks__/CreateTestStore';
import { Provider } from 'react-redux';
import { getUserProfile as mockGetUserProfile } from '../state/actions/index';
import SkeletonLoadingComponent from '../components/common/SkeletonLoading';

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
    localStorage.clear();
    store = createTestStore();
    localStorage.setItem('theme', 'dark');
  });
  test('it renders PendingApproval if role_id is 5', async () => {
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

  //   test('it renders Sidebar', async () => {
  //     act(() => {
  //       render(
  //         <Provider store={store}>
  //           <HomeContainer
  //             LoadingComponent={() => <SkeletonLoadingComponent />}
  //           />
  //         </Provider>
  //       );
  //     });
  //   });
});
