import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavBtnLink } from '../../NavBarLanding/NavBarStyle';

function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();

  const logoutAuth = () => {
    localStorage.removeItem('AuthToken');
    logout({ returnTo: window.location.origin });
  };

  return (
    isAuthenticated && (
      <NavBtnLink className="auth logout" onClick={logoutAuth}>
        Log Out
      </NavBtnLink>
    )
  );
}

export default LogoutButton;
