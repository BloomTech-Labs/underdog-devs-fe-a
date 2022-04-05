import { Avatar } from 'antd';
import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { connect } from 'react-redux';
import './Navbar.css';
import logo from '../Navbar/ud_logo2.png';
import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Layout, Menu, Modal } from 'antd';
import NavBarLanding from '../NavBarLanding/NavBarLanding';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const { Header } = Layout;

const Navbar = ({ isAuthenticated, userProfile }) => {
  const [profilePic] = useState('https://joeschmoe.io/api/v1/random');
  const [user, setUser] = useState({});
  const { authService } = useOktaAuth();
  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);

  const cancelOpen = () => setModal(false);

  const handleLogout = () => {
    setModal(false);
    localStorage.removeItem('role_id');
    localStorage.removeItem('token');
    authService.logout();
  };

  useEffect(() => {
    axiosWithAuth()
      .get('/profile/current_user_profile/')
      .then(user => {
        setUser(user.data);
      });
  }, []);

  if (!isAuthenticated) {
    return <NavBarLanding />;
  }

  const menu = (
    <Menu key="navMenu">
      <Menu.Item key="navProfile" icon={<UserOutlined />}>
        <Link to="/profile">Profile Settings</Link>
      </Menu.Item>
      <Menu.Item key="navLogout" onClick={openModal}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Layout className="layout">
        <Header className="logoDiv">
          <Link to="/dashboard">
            <img
              src={logo}
              alt="underdog devs logo"
              height="68"
              style={{ marginLeft: '1vw' }}
              role="button"
            />
          </Link>
          {Object.keys(user).length && (
            <>
              <Dropdown
                name="logout"
                overlay={menu}
                placement="bottomLeft"
                arrow
              >
                <Menu theme="dark" mode="horizontal">
                  <Menu.Item>Logout</Menu.Item>
                  <Menu.Item>{`Welcome ${user.first_name}`}</Menu.Item>
                  <Avatar
                    className="profilePic"
                    size={50}
                    icon={<UserOutlined />}
                    src={profilePic}
                  />
                </Menu>
              </Dropdown>
            </>
          )}
        </Header>
      </Layout>
      <Modal
        visible={modal}
        onCancel={cancelOpen}
        onOk={handleLogout}
        title="Confirm Log Out"
        role="logout"
      >
        Are you sure you want to log out now?
      </Modal>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: localStorage.getItem('token'),
  };
};

export default connect(mapStateToProps)(Navbar);
