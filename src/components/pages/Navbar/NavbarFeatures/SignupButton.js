import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../../Navbar/Navbar.css';

function SignupButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="btn btn-primary btn-signup"
      onClick={() =>
        loginWithRedirect({
          screen_hint: 'signup',
        })
      }
    >
      Signup
    </button>
  );
}

export default SignupButton;
