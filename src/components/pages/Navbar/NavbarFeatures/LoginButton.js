import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavBtnLink } from '../../NavBarLanding/NavBarStyle';

function LoginButton() {
  // const { loginWithRedirect } = useAuth0();
  function loginRoute() {
    window.location = '/login';
  }
  return (
    // <NavBtnLink
    //   className="btn btn-primary btn-block"
    //   onClick={() => loginWithRedirect()}
    // >
    //   Login
    // </NavBtnLink>
    <NavBtnLink
      className="btn btn-primary btn-block"
      onClick={_ => loginRoute()}
    >
      Login
    </NavBtnLink>
  );
}

export default LoginButton;
