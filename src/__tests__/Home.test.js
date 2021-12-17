import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import './Mocks/matchMedia.mock';
import { LoadingComponent } from '../components/common';
import PendingApproval from '../components/pages/PendingApproval/PendingApproval';
import { act } from 'react-dom/test-utils';


const userInfo = {
  "sub": "00ultx74kMUmEW8054x6",
  "name": "Test005 User",
  "locale": "en-US",
  "email": "llama003@maildrop.cc",
  "preferred_username": "llama003@maildrop.cc",
  "given_name": "Test003",
  "family_name": "User",
  "zoneinfo": "America/Los_Angeles",
  "updated_at": 1599168716,
  "email_verified": true,
  "role": 5
};

afterEach(cleanup);

// jest.mock('@okta/okta-react', () => ({
//   useOktaAuth: () => {
//     return {
//       authState: {
//         isAuthenticated: true,
//       },
//       authService: {
//         getUser: () => Promise.resolve({ name: 'sara' }),
//       },
//     };
//   },
// }));


describe('<HomeContainer /> testing suite', () => {
  test('mounts loading component', async () => {
    render(<LoadingComponent isAuthenticated={true} />);
    const loadingComponent = screen.getByTestId('skeleton-loading');
    expect(loadingComponent).toBeInTheDocument();
  });

  act(()=> {
    
  });
  test('mounts PendingApproval component', async () => {
    act(() => {
      localStorage.setItem('theme', 'dark');
      render(<PendingApproval isAuthenticated={true} userInfo={userInfo} />);
    });
    const testUser003 = screen.getByText(/Test005 User/i);
    expect(testUser003).toBeInTheDocument();

    const pendingUserMessage = screen.getByText(/Hey Test005 User, currently your application is still pending. Please check back again soon!/i);
    expect(pendingUserMessage).toBeInTheDocument();
    
  });

});

// test('mounts a page', async () => {
//   const {getByTestId} = render(
//         <HomePage/>
//     );
// });

// describe('<HomeContainer /> testing suite', () => {
//   test('mounts a page', async () => {
//     const { findByText, getByTestId } = render(
//           <HomePage
//             LoadingComponent={() => (
//               <LoadingComponent />
//             )}
//           />
//     );
//     let loader = getByTestId('skeleton-loading');
//     expect(loader).toBeInTheDocument();

//     await waitFor(async () => {
//       await findByText(/sara/i);
//     });
//     loader = getByTestId('skeleton-loading');
//     expect(loader).toBeNull();
//   });
// });
