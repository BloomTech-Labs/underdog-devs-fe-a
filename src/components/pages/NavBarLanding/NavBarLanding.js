import { UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import logo from '../Navbar/ud_logo2.png';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavItems,
} from './NavBarStyle';

function NavBarLanding(props) {
  const [profilePic, setProfilePic] = useState(
    'https://joeschmoe.io/api/v1/random'
  );

  console.log(props);

  return (
    <>
      <Nav>
        <NavLink to="/landing">
          <img
            src={logo}
            to={`/landing`}
            alt="underdog devs logo"
            height="68"
            style={{ marginLeft: '1vw' }}
          />
        </NavLink>
        <Bars />

        {props.user.userInfo.name ? (
          <div></div>
        ) : (
          <div>
            <NavItems>
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
            </NavItems>
          </div>
        )}

        {!props.user.userInfo.name ? (
          <div></div>
        ) : (
          <div className="userInfo-and-profilePic">
            <div className="userInfo">
              {/* Username State Goes Here */}
              <div className="username"> {props.user.userInfo.name} </div>
              {/* Role State Goes Here */}
              <div className="userRole">Role</div>
            </div>
            <div className="profilePic">
              <Avatar size={50} icon={<UserOutlined />} src={profilePic} />
            </div>
          </div>
        )}
      </Nav>
    </>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(NavBarLanding);
