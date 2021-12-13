import { Avatar, Image } from 'antd';
import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Navbar/ud_logo2.png';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

const Navbar = () => {
  const [profilePic, setProfilePic] = useState(
    'https://joeschmoe.io/api/v1/random'
  );
  return (
    <Layout className="layout">
      <Header>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="logo">
            <img
              src={logo}
              alt="underdog devs logo"
              height="68"
              style={{ marginLeft: '1vw' }}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <div className="userInfo">
              <div>{/* username stuff here */}</div>
              <div>{/* role stuff here */}</div>
              <div>
                <Avatar icon={<UserOutlined />} src={profilePic} />
              </div>
            </div>
          </div>
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
