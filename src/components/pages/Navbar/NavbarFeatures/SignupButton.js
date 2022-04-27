import React from 'react';
import { NavBtnLink } from '../../NavBarLanding/NavBarStyle';

function SignupButton() {
  return (
    <NavBtnLink to={`/signup`} key="signup">
      Signup
    </NavBtnLink>
  );
}

export default SignupButton;
