import { Avatar, Button, Input } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import './Navbar.css';
import logo from '../Navbar/ud_logo2.png';

const Navbar = props => {
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
            {props.user.profile.name}
          </Avatar>
        </Avatar.Group>
      </div>
    </div>
  );
};

// DO NOT GIT ADD THIS FILE TO COMMIT OR PUSH

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Navbar);
