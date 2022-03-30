import { Avatar } from 'antd';
import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { connect } from 'react-redux';
import './Navbar.css';
import logo from '../Navbar/ud_logo2.png';
import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Layout, Menu } from 'antd';
import NavBarLanding from '../NavBarLanding/NavBarLanding';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const Navbar = ({ isAuthenticated, userProfile }) => {
  const [profilePic] = useState('https://joeschmoe.io/api/v1/random');
  const [user, setUser] = useState({});

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
      <Menu.Item key="navLogout">Log Out</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Layout className="layout">
        <Header>
          <div className="logoDiv">
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
              <Dropdown overlay={menu} placement="bottomLeft" arrow>
                <div className="userInfo-and-profilePic">
                  <div className="userInfo">
                    <div className="username">Welcome {user.first_name}</div>
                  </div>
                  <div className="profilePic">
                    <Avatar
                      size={50}
                      icon={<UserOutlined />}
                      src={profilePic}
                    />
                  </div>
                </div>
              </Dropdown>
            )}
          </div>
        </Header>
      </Layout>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: localStorage.getItem('token'),
  };
};

export default connect(mapStateToProps)(Navbar);
