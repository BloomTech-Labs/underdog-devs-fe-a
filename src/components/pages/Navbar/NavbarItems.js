import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import './Navbar.less';
import { Menu, Button } from 'antd';

const NavbarItems = () => {
  const { loginWithRedirect } = useAuth0();
  const { logout, isAuthenticated } = useAuth0();
  const { push } = useHistory();

  const logoutAuth = () => {
    localStorage.removeItem('AuthToken');
    logout({ returnTo: window.location.origin });
  };

  return (
    <Menu theme="dark" mode="vertical">
      {!isAuthenticated && (
        <Button
          type="primary"
          onClick={() => loginWithRedirect({ redirectUri: '/dashboard' })}
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
