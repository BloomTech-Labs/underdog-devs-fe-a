import { Avatar, Image } from 'antd';
import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Navbar/ud_logo2.png';
import { UserOutlined } from '@ant-design/icons';
import { Layout } from 'antd';

const { Header } = Layout;

const Navbar = () => {
  //when profile pictures are implemented into the backend, flesh out functions that will retrieve picture and set it to state
  const [profilePic, setProfilePic] = useState(
    'https://joeschmoe.io/api/v1/random'
  );
  return (
    <Layout className="layout">
      <Header>
        <div
          className="logoDiv"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <div>
            <img
              src={logo}
              alt="underdog devs logo"
              height="68"
              style={{ marginLeft: '1vw' }}
            />
          </div>
          <div
            className="userInfo-and-profilePic"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <div
              className="userInfo"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '.5vw',
                color: 'white',
              }}
            >
              {/* Username State Goes Here */}
              <div
                className="username"
                style={{
                  display: 'flex',
                  height: '3vh',
                  alignItems: 'center',
                }}
              >
                {' '}
                Username{' '}
              </div>
              {/* Role State Goes Here */}
              <div
                className="userRole"
                style={{
                  display: 'flex',
                  height: '1vh',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontStyle: 'italic',
                  fontSize: '.7rem',
                }}
              >
                {' '}
                Role{' '}
              </div>
            </div>
            <div className="profilePic" style={{ padding: '0vh 1vw' }}>
              <Avatar size={50} icon={<UserOutlined />} src={profilePic} />
            </div>
          </div>
        </div>
      </Header>
    </Layout>
  );
};

// to be fleshed out when redux to be completed and pushed so that we can get a hold of user info

// const mapStateToProps = (state) => {
//   return {

//   };
// };

export default Navbar;

// export default connect(mapStateToProps)(Navbar);
