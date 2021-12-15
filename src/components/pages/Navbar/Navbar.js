import { Avatar, Button } from 'antd';
import React from 'react';
import './Navbar.css';
import logo from '../Navbar/ud_logo2.png';

const Navbar = () => {
  return (
    <div className="navBar">
      <div className="navLogo">
        <img src={logo} alt="underdog devs logo" />
        <p className="navLogoText">Underdog Devs</p>
      </div>
      <div className="navBoxRight">
        <nav>
          <Button type="link" className="navBarFont" href="/examplefeature">
            Open Tickets
          </Button>
        </nav>
        <Avatar.Group>
          <Avatar
            className="avatar"
            shape="circle"
            size="large"
            style={{ backgroundColor: 'gray' }}
          >
            Avatar
          </Avatar>
        </Avatar.Group>
      </div>
    </div>
  );
};

export default Navbar;
