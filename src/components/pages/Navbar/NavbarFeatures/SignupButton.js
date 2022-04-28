import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavBtnLink } from '../../NavBarLanding/NavBarStyle';

function SignupButton() {
  const { loginWithRedirect } = useAuth0();

  const signUp = () => loginWithRedirect({ screen_hint: 'signup' });

  return <NavBtnLink onClick={signUp}>Signup</NavBtnLink>;
}

export default SignupButton;
