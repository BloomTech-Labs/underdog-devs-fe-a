import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../../Navbar/Navbar.css';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="btn btn-primary btn-login"
      onClick={() => loginWithRedirect()}
    >
      Login
    </button>
  );
}

export default LoginButton;
