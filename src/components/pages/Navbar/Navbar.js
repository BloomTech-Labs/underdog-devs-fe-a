import { Avatar, Button, Input } from 'antd';
import React, { useEffect } from 'react';
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
            {props.user}
          </Avatar>
        </Avatar.Group>
      </div>
    </div>
  );
};

// DO NOT GIT ADD THIS FILE TO COMMIT OR PUSH

const mapStateToProps = state => {
  console.log('STATE', state);
  return {
    user: state.user.username,
    //user: is state from our store, user from index.js in reducers folder, username from the return
  };
};

export default connect(mapStateToProps)(Navbar);
