import { Avatar } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Navbar.css';
import logo from '../Navbar/ud_logo2.png';
import { UserOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import NavBarLanding from '../NavBarLanding/NavBarLanding';

const { Header } = Layout;

const Navbar = ({ isAuthenticated, profile }) => {
  const [profilePic, setProfilePic] = useState(
    'https://joeschmoe.io/api/v1/random'
  );

  if (!isAuthenticated) {
    return <NavBarLanding />;
  }

  return (
    <Layout className="layout">
      <Header>
        <div className="logoDiv">
          <div>
            <img
              src={logo}
              alt="underdog devs logo"
              height="68"
              style={{ marginLeft: '1vw' }}
            />
          </div>
          {Object.keys(profile).length && (
            <div className="userInfo-and-profilePic">
              <div className="userInfo">
                {/* Username State Goes Here */}
                <div className="username">{profile?.first_name}</div>
                {/* Role State Goes Here */}
                <div className="userRole">Role</div>
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
    profile: state.user.profile,
    isAuthenticated: state.user.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Navbar);
