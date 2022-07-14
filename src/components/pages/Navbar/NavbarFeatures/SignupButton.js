import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavBtnLink } from '../../NavBarLanding/NavBarStyle';

function SignupButton() {
  const { loginWithRedirect } = useAuth0();

  const myfunction = () => {
    window.location = '/apply';
  };

  return (
    <NavBtnLink
      className="btn btn-primary btn-block"
      // onClick={() =>
      //   loginWithRedirect({
      //     screen_hint: 'signup',
      //   })
      // }
      onClick={() => {
        myfunction();
      }}
    >
      Signup
    </NavBtnLink>
  );
}

export default SignupButton;
