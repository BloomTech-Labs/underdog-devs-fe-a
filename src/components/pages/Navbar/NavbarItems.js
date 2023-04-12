import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import './Navbar.less';
import { Menu, Button, Switch, Space } from 'antd';
import { useEffect, useState } from 'react';
import { setTheme } from '../../common/DarkModeToggle';

const NavbarItems = () => {
  const [darkMode, setDarkMode] = useState('dark');
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const { push } = useHistory();

  const logoutAuth = () => {
    localStorage.removeItem('AuthToken');
    logout({ returnTo: window.location.origin });
  };

  const darkModeHandler = () => {
    setDarkMode(darkMode === 'dark' ? 'light' : 'dark');
    setTheme(darkMode);
  };
  console.log(darkMode);

  /* NOTE: useEffect in place to test pulling user info from Auth0. Leaving 
     this here as an example so we can use this moving forward when pulling user
     data from the DS API. */
  useEffect(() => {
    setTheme(darkMode);
    isAuthenticated ? console.log(user) : console.log('Not authenticated.');
  }, [isAuthenticated, user, darkMode]);

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
        <>
          <div className="darkModeLabel">Dark Mode</div>
          {/* <Space> */}
          <Switch
            checkedChildren={`ON`}
            unCheckedChildren={`OFF`}
            defaultChecked={true}
            onClick={() => {
              darkModeHandler();
            }}
          />
          {/* <br /> */}
          <Button type="primary" onClick={logoutAuth}>
            Logout
          </Button>
          {/* </Space> */}
        </>
      )}
    </Menu>
  );
};

export default NavbarItems;
