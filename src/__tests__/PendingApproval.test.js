import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import './Mocks/matchMedia.mock';
import PendingApproval from '../components/pages/PendingApproval/PendingApproval';
import { act } from 'react-dom/test-utils';

const userInfo = {
  sub: '00ultx74kMUmEW8054x6',
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
};

afterEach(cleanup);

describe('<PendingApproval /> testing suite', () => {
  test('mounts PendingApproval component', async () => {
    act(() => {
      localStorage.setItem('theme', 'dark');
      render(<PendingApproval userInfo={userInfo} />);
    });
    const testUser005 = await screen.findByText(/Test005 User/i);
    expect(testUser005).toBeInTheDocument();

    const pendingUserMessage = await screen.findByText(
      /Hey Test005 User, currently your application is still pending. Please check back again soon!/i
    );
    expect(pendingUserMessage).toBeInTheDocument();
  });
});
