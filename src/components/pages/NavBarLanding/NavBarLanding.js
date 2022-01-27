import React from 'react';
import logo from '../Navbar/ud_logo2.png';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavBarStyle';

export default function NavBarLanding() {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <img
            src={logo}
            to={`/landing`}
            alt="underdog devs logo"
            height="68"
            style={{ marginLeft: '1vw' }}
          />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to={`/mentor`}>Mentor</NavLink>
          <NavLink to={`/mentee`}>Mentee</NavLink>
          <NavLink to={`/about`}> About Us</NavLink>
          <NavLink to={`/donate`}>Donate</NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to={`/login`} key="login">
            Login
          </NavBtnLink>
          <NavBtnLink to={`/signup`} key="signup">
            Signup
          </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
}
