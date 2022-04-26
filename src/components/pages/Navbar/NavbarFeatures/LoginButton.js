import React from 'react';
import { NavBtn, NavBtnLink } from '../../NavBarLanding/NavBarStyle';

function LoginButton() {
  return (
    <NavBtn>
      <NavBtnLink to={`/login`} key="login">
        Login
      </NavBtnLink>
    </NavBtn>
  );
}

export default LoginButton;
