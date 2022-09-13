import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { connect } from 'react-redux';
import './Navbar.css';
import logo from '../Navbar/ud_logo2.png';
import { UserOutlined, FormOutlined } from '@ant-design/icons';
import { Dropdown, Layout, Menu, Modal, Popover, Switch } from 'antd';
import NavBarLanding from '../NavBarLanding/NavBarLanding';
import { Link, useHistory } from 'react-router-dom';
import { getProfile } from '../../../state/actions/userProfile/getProfile';
import LoginButton from './NavbarFeatures/LoginButton';
import ApplyButton from './NavbarFeatures/ApplyButton';
import LogoutButton from './NavbarFeatures/LogoutButton';
import MentorPopover from './NavbarFeatures/MentorPopover';
import { useAuth0 } from '@auth0/auth0-react';

const { Header } = Layout;

const Navbar = ({ isAuthenticated, userProfile, getProfile }) => {
  const [user, setUser] = useState({});
  const [modal, setModal] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(false);
  const { logout } = useAuth0();

  const openModal = () => setModal(true);
  const cancelOpen = () => setModal(false);

  const history = useHistory();

  const handleLogout = () => {
    setModal(false);
    localStorage.removeItem('role_id');
    localStorage.removeItem('AuthToken');
    logout({ returnTo: window.location.origin });
  };
  useEffect(() => {
    axiosWithAuth()
      .get(`/profile/current_user_profile/`)
      .then(user => {
        setUser(user.data);
        getProfile(user.data.profile_id);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const profile_id = user.profile_id;
  const isMentor = user.role_id === 3;

  // Determines the initial state of the Mentor toggle switch
  useEffect(() => {
    axiosWithAuth()
      .post(`/profile/mentor-information`, { profile_id })
      .then(res => {
        const availability = res.data[0].availability;
        setToggleStatus(availability);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return <NavBarLanding />;
  }

  const menuItems = [
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Profile Settings',
    },
    {
      key: 'navLogout',
      label: 'Log Out',
    },
  ];

  const handleMenuClick = menu => {
    if (menu.key === 'navLogout') {
      openModal();
      return;
    }
    // push(menu.key);
  };

  const handleToggleChange = checked => {
    if (!checked) {
      axiosWithAuth()
        .post(`/profile/availability/${profile_id}`, {
          accepting_new_mentees: false,
        })
        .then(res => {
          setToggleStatus(false);
        })
        .catch(err => console.log(err));
    }

    if (checked) {
      axiosWithAuth()
        .post(`/profile/availability/${profile_id}`, {
          accepting_new_mentees: true,
        })
        .then(res => {
          setToggleStatus(true);
        })
        .catch(err => console.log(err));
    }
  };

  const accountMenu = <Menu items={menuItems} onClick={handleMenuClick} />;

  const reloadLogo = () => {
    isAuthenticated ? history.push('/') : document.location.reload();
  };

  return (
    <>
      <Layout className="layout">
        <Header className="menuBar">
          <div className="logoDiv">
            <div onClick={reloadLogo}>
              <img
                src={logo}
                alt="underdog devs logo"
                height="68"
                style={{ marginLeft: '1vw' }}
                role="button"
              />
            </div>
            {isMentor && (
              <Popover
                title={`Status: ${
                  toggleStatus ? 'Accepting' : 'Not Accepting'
                }`}
                content={<MentorPopover />}
                placement="bottom"
              >
                <section className="mentorStatus">
                  <Switch
                    checked={toggleStatus}
                    onChange={handleToggleChange}
                    id="mentorSwitch"
                  />
                  <span className="toggleText">New Mentees</span>
                </section>
              </Popover>
            )}
            {Object.keys(user).length && (
              <div className="userInfo-and-profilePic">
                <Link
                  key="memosLinkNav"
                  to="/memos"
                  style={{ color: '#FFF' }}
                  className="memos"
                >
                  <FormOutlined className="memo-icon" />
                  Memos
                </Link>
                <Dropdown overlay={accountMenu} placement="bottom" arrow>
                  <div className="userInfo-and-profilePic">
                    <div className="userInfo">
                      <div
                        className="username"
                        // eslint-disable-next-line jsx-a11y/aria-role
                        role="text"
                        aria-label="Account settings"
                      >
                        <div className="username">
                          Welcome {userProfile.first_name}
                        </div>
                      </div>
                    </div>
                  </div>
                </Dropdown>
              </div>
            )}
            {!isAuthenticated && (
              <div className="header_buttons">
                <LoginButton />
                <ApplyButton />
                <LogoutButton />
              </div>
            )}
            {/* temporary logout button until private route is finished and when we can logout from dashboard */}
          </div>
        </Header>
      </Layout>
      <Modal
        visible={modal}
        onCancel={cancelOpen}
        onOk={handleLogout}
        title="Confirm Log Out"
        role="logout"
      >
        Are you sure you want to log out now?
      </Modal>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: localStorage.getItem('token'),
    userProfile: state.user.userProfile,
  };
};

export default connect(mapStateToProps, { getProfile })(Navbar);
