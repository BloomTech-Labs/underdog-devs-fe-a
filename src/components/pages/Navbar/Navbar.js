import { Avatar } from 'antd';
import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { connect } from 'react-redux';
import './Navbar.css';
import logo from '../Navbar/ud_logo2.png';
import { UserOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
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

  return (
    <Layout className="layout">
      <Header>
        <div className="logoDiv">
          <Link to="/dashboard">
            <img
              src={logo}
              alt="underdog devs logo"
              height="68"
              style={{ marginLeft: '1vw' }}
            />
          </div>
          {Object.keys(user).length && (
            <div className="userInfo-and-profilePic">
              <div className="userInfo">
                <div className="username">Welcome {user.first_name}</div>
              </div>
              <div className="profilePic">
                <Avatar size={50} icon={<UserOutlined />} src={profilePic} />
              </div>
            </div>
          )}
        </div>
      </Header>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: localStorage.getItem('token'),
  };
};

export default connect(mapStateToProps)(Navbar);
