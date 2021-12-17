import React from 'react';
import { render, cleanup, getByText } from '@testing-library/react';
import { HomePage } from '../components/pages/Home/index';
import HomeContainer from '../components/pages/Home/HomeContainer';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../state/reducers/index';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, promiseMiddleware)
);


afterEach(cleanup);

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => {
    return {
      authState: {
        isAuthenticated: true,
      },
      authService: {
        getUser: () => Promise.resolve({ name: 'sara' }),
      },
    };
  },
}));


describe('<HomeContainer /> testing suite', () => {
  test('mounts a page', async () => {
    const {getByTestId} = render(

          <HomePage/>

      );
      
  });
});




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
