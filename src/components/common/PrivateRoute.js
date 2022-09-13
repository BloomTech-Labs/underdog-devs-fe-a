import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Sidebar from './Sidebar/Sidebar';
import { Spin } from 'antd';

const PrivateRoute = ({ component, path, ...args }) => (
  <Sidebar>
    <Route
      path={path}
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <Spin />,
      })}
      {...args}
    />
  </Sidebar>
);

export default PrivateRoute;
