import React, { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { NavBtnLink } from '../../NavBarLanding/NavBarStyle';

function SignupButton() {
  const { loginWithRedirect, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: 'underdog-identifier',
          scope: 'openid profile email',
        });
        localStorage.setItem('AuthToken', token);
      } catch (e) {
        console.log(e.message);
      }
    };
    getUserData();
  }, [getAccessTokenSilently]);

  return (
    <NavBtnLink
      className="btn btn-primary btn-block"
      onClick={() =>
        loginWithRedirect({
          screen_hint: 'signup',
        })
      }
    >
      Apply
    </NavBtnLink>
  );
}

export default SignupButton;
