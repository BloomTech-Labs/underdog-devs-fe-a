import { Avatar, Button, Input } from 'antd';
import React from 'react';
import './Navbar.css';
import logo from '../Navbar/ud_logo2.png';

import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

const Navbar = () => {
  return (
    <Layout className="layout">
      <Header>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <img src={logo} alt="underdog devs logo" height="30" />
          </div>
          <div>{/* profile stuff goes here */}</div>
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
