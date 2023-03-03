import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import './Navbar.less';
import { Menu, Button } from 'antd';
import { useEffect } from 'react';

const NavbarItems = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const { push } = useHistory();

  const logoutAuth = () => {
    localStorage.removeItem('AuthToken');
    logout({ returnTo: window.location.origin });
  };

  /* NOTE: useEffect in place to test pulling user info from Auth0. Leaving 
     this here as an example so we can use this moving forward when pulling user
     data from the DS API. */
  useEffect(() => {
    isAuthenticated ? console.log(user) : console.log('Not authenticated.');
  }, [isAuthenticated, user]);

  return (
    <Menu theme="dark" mode="vertical">
      {!isAuthenticated && (
        <Button
          type="primary"
          onClick={() => loginWithRedirect()}
          style={{ marginLeft: 'auto' }}
        >
          Login
        </Button>
      )}
      {!isAuthenticated && (
        <Button type="primary" onClick={() => push('/apply')}>
          Apply
        </Button>
      )}
      {isAuthenticated && (
        <Button type="primary" onClick={logoutAuth}>
          Logout
        </Button>
      )}
    </Menu>
  );
};

export default NavbarItems;
