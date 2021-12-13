import { Avatar } from 'antd';
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
        <div className="logoDiv">
          <div>
            <img
              src={logo}
              alt="underdog devs logo"
              height="68"
              style={{ marginLeft: '1vw' }}
            />
          </div>
          <div className="userInfo-and-profilePic">
            <div className="userInfo">
              {/* Username State Goes Here */}
              <div className="username"> Username </div>
              {/* Role State Goes Here */}
              <div className="userRole">Role</div>
            </div>
            <div className="profilePic">
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
