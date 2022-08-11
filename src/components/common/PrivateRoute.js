import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Sidebar from './Sidebar/Sidebar';

const PrivateRoute = ({ component, path, ...args }) => (
  <Sidebar>
    <Route
      path={path}
      /* NOTE: this is commented out for current functionality, but is a template for building auth0 into the app*/
      // component={withAuthenticationRequired(component({ ...args }), {
      //   onRedirecting: () => <div>loading </div>,
      // })}
      component={() => component({ ...args })}
    />
  </Sidebar>
);

export default PrivateRoute;
