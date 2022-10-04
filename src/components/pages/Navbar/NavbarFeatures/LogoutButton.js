import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();

  const logoutAuth = () => {
    localStorage.removeItem('AuthToken');
    logout({ returnTo: window.location.origin });
  };

  return (
    isAuthenticated && (
      <button className="auth logout" onClick={logoutAuth}>
        Log Out
      </button>
    )
  );
}

export default LogoutButton;
