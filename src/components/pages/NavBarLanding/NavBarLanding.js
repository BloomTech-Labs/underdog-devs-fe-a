import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Button, Layout, Breadcrumb } from 'antd';
import './NavBarLanding.css';

const { Header } = Layout;

export default function NavBarLanding() {
  return (
    <>
      <Header>
        <Menu mode="horizontal">
          <li>
            <Menu.Item>Home</Menu.Item>
          </li>
          <li>
            <Menu.Item>Mentor</Menu.Item>
          </li>
          <li>
            <Menu.Item>Mentee</Menu.Item>
          </li>
          <li>
            <Menu.Item>About Us</Menu.Item>
          </li>
          <li>
            <Menu.Item>Donate</Menu.Item>
          </li>
          <Menu.Item key="login">
            <a href="/Login">Login</a>
          </Menu.Item>
          <Menu.Item key="signup">
            <a href="/signup">Signup</a>
          </Menu.Item>
        </Menu>
      </Header>
      {/* <NavLink className="navbar_links" to="/landing">
          Home
        </NavLink>
        <NavLink className="navbar_links" to="/mentor">
          Mentor
        </NavLink>
        <NavLink className="navbar_links" to="/mentee">
          Mentee
        </NavLink>
        <NavLink className="navbar_links" to="/aboutus">
          About Us
        </NavLink>
        <NavLink className="navbar_links" to="/donate">
          Donate
        </NavLink>
        <NavLink className="navbar_links" to="/login">
          Login
        </NavLink>
        <NavLink className="navbar_links" to="/signup">
          Signup
        </NavLink> */}
    </>
  );
}
