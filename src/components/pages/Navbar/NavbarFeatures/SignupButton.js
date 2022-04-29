import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavBtnLink } from '../../NavBarLanding/NavBarStyle';

function SignupButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <NavBtnLink
      className="btn btn-primary btn-block"
      onClick={() =>
        loginWithRedirect({
          screen_hint: 'signup',
        })
      }
    >
      Signup
    </NavBtnLink>
  );
}

export default SignupButton;
