import React from 'react';
import { NavBtnLink } from '../../NavBarLanding/NavBarStyle';

function LoginButton() {
  return (
    <NavBtnLink to={`/login`} key="login">
      Login
    </NavBtnLink>
  );
}

export default LoginButton;
