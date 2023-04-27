import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import './Navbar.less';
import { Menu, Button, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { setTheme } from '../../common/DarkModeToggle';
import { setThemeRedux } from '../../../state/actions/theme/index';

const NavbarItems = () => {
  const [darkMode, setDarkMode] = useState('dark');
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const { push } = useHistory();
  const dispatch = useDispatch();

  const logoutAuth = () => {
    localStorage.removeItem('AuthToken');
    logout({ returnTo: window.location.origin });
  };

  const darkModeHandler = () => {
    setDarkMode(darkMode === 'dark' ? 'light' : 'dark');
    setTheme(darkMode);
  };

  /* NOTE: useEffect in place to test pulling user info from Auth0. Leaving 
     this here as an example so we can use this moving forward when pulling user
     data from the DS API. */
  useEffect(() => {
    setTheme(darkMode);
    dispatch(setThemeRedux(darkMode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode]);

  return (
    <Menu
      style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
      theme="dark"
      mode="vertical"
    >
      <div className="darkModeLabel">Dark Mode</div>
      <Switch
        checkedChildren={`ON`}
        unCheckedChildren={`OFF`}
        defaultChecked={true}
        onClick={() => {
          darkModeHandler();
        }}
      />
      <br />
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
          <Button type="primary" onClick={logoutAuth}>
            Logout
          </Button>
        </>
      )}
    </Menu>
  );
};

const mapStateToProps = state => {
  return { themeRedux: state.theme.theme };
};

export default connect(mapStateToProps)(NavbarItems);
