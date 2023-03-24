import React, { useState, useEffect } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { connect } from 'react-redux';
import './Navbar.less';
import logo from '../Navbar/ud_logo2.png';
import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Layout, Menu, Modal, Popover, Switch } from 'antd';
import { useHistory } from 'react-router-dom';
import MentorPopover from './NavbarFeatures/MentorPopover';
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../../../config';
import { setFetchStart } from '../../../state/actions/lifecycle/setFetchStart';
import { setFetchEnd } from '../../../state/actions/lifecycle/setFetchEnd';
import { setFetchError } from '../../../state/actions/errors/setFetchError';
import NavbarItems from './NavbarItems';
import { setCurrentUser } from '../../../state/actions/userProfile/setCurrentUser';
const { Header } = Layout;

const Navbar = ({ userProfile, getProfile, currentUser, dispatch }) => {
  const [appUser, setAppUser] = useState({});
  const [modal, setModal] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(false);
  const { logout, isAuthenticated, user } = useAuth0();
  const { axiosWithAuth } = useAxiosWithAuth0();

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
    (async () => {
      if (isAuthenticated) {
        // const user = await axiosWithAuth().get(
        //   `/profile/current_user_profile/`
        // );
        // const currentUser = user;
        console.log(user);

        // setAppUser(currentUser);

        axiosWithAuth()
          .post('/profile/current_user_profile', user)
          .then(profile => {
            console.log({ ...user, ...profile.data });
            dispatch(
              setCurrentUser({
                ...user,
                role: profile.data.role,
                user_id: profile.data.user_id,
              })
            );
          })
          .catch(err => {
            console.error(err);
          });
        console.log(currentUser);

        // The following code was taken from the userProfile redux action file
        // setFetchStart();
        // axiosWithAuth
        //   .get(`${API_URL}profile/${user.data.profile_id}`)
        //   .then(res => {
        //     if (res.data) {
        //       getProfile(res.data);
        //     }
        //   })
        //   .catch(err => {
        //     setFetchError(err);
        //   })
        //   .finally(() => {
        //     setFetchEnd();
        //   });
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Object.values(currentUser).length, isAuthenticated]);

  const profile_id = currentUser.profile_id;
  const isMentor = currentUser.role_id === 3;

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
  };

  const handleToggleChange = checked => {
    axiosWithAuth
      .post(`${API_URL}profile/availability/${profile_id}`, {
        accepting_new_mentees: checked,
      })
      .then(res => {
        setToggleStatus(checked);
      })
      .catch(err => console.log(err));
  };

  const accountMenu = <Menu items={menuItems} onClick={handleMenuClick} />;

  const reloadLogo = () => {
    //*******************/
    history.push('/');
    document.location.reload();
    //*******************/

    //isAuthenticated ? history.push('/') : document.location.reload();
  };

  if (!currentUser) {
    return <NavbarItems />;
  } else {
    return (
      <>
        <Layout className="layout">
          <Header className="menuBar">
            <div className="logoDiv">
              <div onClick={reloadLogo}>
                <img
                  src={logo}
                  alt="underdog devs logo"
                  height="50"
                  style={{ marginLeft: '1em' }}
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

              {Object.keys(currentUser).length ? (
                <div className="userInfo-and-profilePic">
                  <Dropdown overlay={accountMenu} placement="bottom" arrow>
                    <div className="userInfo-and-profilePic">
                      <div className="userInfo">
                        <div className="username" aria-label="Account settings">
                          <div className="username">
                            Welcome {userProfile.first_name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dropdown>
                </div>
              ) : (
                ''
              )}
              <NavbarItems />
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
  }
};

/**
 * Author: Khaleel Musleh
 * @param {mapStateToProps}
 * Added userProfile and currentUser to state for fetching current user data and user which is currently being viewed or altered and renders it in the Navbar.js component.
 */

const mapStateToProps = state => {
  return {
    userProfile: state.user.userProfile,
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(Navbar);
