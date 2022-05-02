import React from 'react';
import { NavBtnLink } from '../../NavBarLanding/NavBarStyle';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  return (
    <NavBtnLink to={`/login`} key="login">
      Login
    </NavBtnLink>
  );
}

export default LoginButton;
