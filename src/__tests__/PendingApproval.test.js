import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Sidebar from '../components/common/Sidebar/Sidebar';

const userInfo = {
  sub: "00ultwqjtqt4VCcS24x6",
  name: "Test004 User",
  locale: "en-US",
  email: "llama004@maildrop.cc",
  preferred_username: "llama004@maildrop.cc",
  given_name: "Test004",
  family_name: "User",
  zoneinfo: "America/Los_Angeles",
  updated_at: 1599168716,
  email_verified: true,
  role: 3
};

afterEach(cleanup);

describe("Mentor's appropriate dashboard testing suite", () => {
  test('mounts correct sidebar for mentor', async () => {
    act(() => {
      localStorage.setItem('theme', 'dark');
      localStorage.setItem('role_id', 3);
      render(<Sidebar isAuthenticated={true} userInfo={userInfo} />);
    });

    const myMentees = await screen.findByText(/My Mentees/i);
    expect(myMentees).toBeInTheDocument();

    const calendar = document.getElementsByClassName('calendar');
    expect(calendar).toBeTruthy();
    
  });
});
