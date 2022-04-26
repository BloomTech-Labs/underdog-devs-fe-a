import React from 'react';
import { NavBtn, NavBtnLink } from '../../NavBarLanding/NavBarStyle';

function SignupButton() {
  return (
    <NavBtn>
      <NavBtnLink to={`/signup`} key="signup">
        Signup
      </NavBtnLink>
    </NavBtn>
  );
}

export default SignupButton;
