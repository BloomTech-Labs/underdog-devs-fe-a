import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Sidebar from './Sidebar/Sidebar';

const PrivateRoute = ({ component: Component, path, ...args }) => (
  <Sidebar>
    <Route
      path={path}
      /* NOTE: this is commented out for current functionality, but is a template for building auth0 into the app*/
      // component={withAuthenticationRequired(component({ ...args }), {
      //   onRedirecting: () => <div>loading </div>,
      // })}

      // Could not pass props as this argument returns "component is not a function" when connecting state to other components using {connect}

      // component={() => component({ ...args })}
    />
    <Component {...args} />
  </Sidebar>
);

export default PrivateRoute;
