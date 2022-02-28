import React from 'react';
import logo from '../Navbar/ud_logo2.png';
import {
  Nav,
  NavLink,
  Bars,
  NavBtn,
  NavBtnLink,
  NavItems,
} from './NavBarStyle';

function NavBarLanding() {
  return (
    <Nav>
      <NavLink to="/">
        <img
          src={logo}
          to={`/`}
          alt="underdog devs logo"
          height="68"
          style={{ marginLeft: '1vw' }}
        />
      </NavLink>
      <Bars />

      <div>
        <NavItems>
          <NavBtn>
            <NavBtnLink to={`/login`} key="login">
              Login
            </NavBtnLink>
            <NavBtnLink to={`/apply`} key="signup">
              Apply
            </NavBtnLink>
          </NavBtn>
        </NavItems>
      </div>
    </Nav>
  );
}

export default NavBarLanding;
