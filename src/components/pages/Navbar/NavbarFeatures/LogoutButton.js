import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { NavBtnLink } from '../../NavBarLanding/NavBarStyle';

function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();

  const logoutAuth = () => {
    localStorage.removeItem('AuthToken');
    logout();
  };

  return (
    isAuthenticated && (
      <button
        className="auth logout"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log Out
      </button>
    )
  );
}

export default LogoutButton;
