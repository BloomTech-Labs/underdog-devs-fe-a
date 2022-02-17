import React, { useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import 'antd/dist/antd.css';
import '../styles/Sidebar.css';
import { Link } from 'react-router-dom';
import { Layout, Menu, Switch as Toggle } from 'antd';
import {
  QuestionCircleOutlined,
  DollarOutlined,
  BulbOutlined,
  CalendarOutlined,
  ContainerOutlined,
  UserOutlined,
} from '@ant-design/icons';

import {
  MenteeComponents,
  MentorComponents,
  AdminComponents,
} from './SidebarComponents';

import { useEffect } from 'react';
import { getAuthHeader } from '../../../api/index';
import useTheme from '../../../hooks/useTheme';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = ({ authService, userProfile }) => {
  const { role_id } = userProfile;
  const [collapsed, setCollapsed] = useState(false);
  //  render will update on click of Menu.item (56-58), therefore rendering the correct component (203-205)
  const [render, updateRender] = useState(1);
  const { authState } = useOktaAuth();

  const toggleTheme = useTheme();

  useEffect(() => {
    getAuthHeader(authState);
  });

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const handleLogout = checked => {
    authService.logout();
    localStorage.removeItem('role_id');
    localStorage.removeItem('token');
  };

  const handleMenuClick = menu => {
    updateRender(menu.key);
  };

  // This is determining which role is currently in session, implemented further in ternary statements in the return clause
  const isUserMentee = () => {
    if (role_id === '4') {
      return true;
    }
    return false;
  };
  const isUserMentor = () => {
    if (role_id === '3') {
      return true;
    }
    return false;
  };
  const isUserAdmin = () => {
    if (role_id <= '2' && role_id >= '1') {
      return true;
    }
    return false;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <SubMenu key="sub1" icon={<CalendarOutlined />} title="Schedule">
            <Menu.Item key="1" onClick={handleMenuClick}>
              Calendar
            </Menu.Item>
            {isUserMentee() && (
              <Menu.Item key="2" onClick={handleMenuClick}>
                Upcoming Meetings
              </Menu.Item>
            )}
            {isUserMentor() && (
              <>
                <Menu.Item key="2" onClick={handleMenuClick}>
                  Schedule Meeting
                </Menu.Item>
              </>
            )}
            {isUserAdmin() && (
              <Menu.Item key="2" onClick={handleMenuClick}>
                Schedule Interview
              </Menu.Item>
            )}
          </SubMenu>
          {isUserMentee() && (
            <>
              <Menu.Item key="3" onClick={handleMenuClick}>
                My Assignments
              </Menu.Item>
              <Menu.Item key="4" onClick={handleMenuClick}>
                Access Resources
              </Menu.Item>
            </>
          )}
          {isUserMentor() ? (
            <>
              <Menu.Item key="3" onClick={handleMenuClick}>
                My Mentees
              </Menu.Item>
              <Menu.Item key="4" onClick={handleMenuClick}>
                Manage Resources
              </Menu.Item>
            </>
          ) : isUserAdmin() ? (
            <>
              <Menu.Item key="0" onClick={handleMenuClick}>
                Dashboard
              </Menu.Item>
              <Menu.Item key="3" onClick={handleMenuClick}>
                Manage Resources
              </Menu.Item>
              <Menu.Item key="4" onClick={handleMenuClick}>
                Pending Applications
              </Menu.Item>
              <Menu.Item key="5" onClick={handleMenuClick}>
                Matching
              </Menu.Item>
              <Menu.Item key="6" onClick={handleMenuClick}>
                Manage Users
              </Menu.Item>
              <Menu.Item key="7" onClick={handleMenuClick}>
                View Support Requests
              </Menu.Item>
              <Menu.Item key="8" onClick={handleMenuClick}>
                View All Meetings
              </Menu.Item>
            </>
          ) : (
            <></>
          )}
          <SubMenu key="sub4" icon={<UserOutlined />} title="Account">
<<<<<<< HEAD
            <Menu.Item key="8" onClick={handleMenuClick}>
              <Link to="/profile">Profile Settings</Link>
=======
            <Menu.Item key="9" onClick={handleMenuClick}>
              Profile Settings
>>>>>>> bc81dae (matching component started)
            </Menu.Item>
            <Menu.Item key="10" onClick={handleMenuClick}>
              Account Settings
            </Menu.Item>
            <Menu.Item key="11" onClick={handleLogout}>
              Log Out
            </Menu.Item>
          </SubMenu>
          {isUserAdmin() === false && (
            <>
              <Menu.Item
                key="11"
                icon={<DollarOutlined />}
                onClick={handleMenuClick}
              >
                Donate
              </Menu.Item>
              <Menu.Item
                key="12"
                icon={<QuestionCircleOutlined />}
                onClick={handleMenuClick}
              >
                Support
              </Menu.Item>
            </>
          )}
          <Menu.Divider />
          <Menu.Item key="13" icon={<BulbOutlined />}>
            <div id="darkmode">
              Darkmode
              <Toggle size="small" id="darkModeToggle" onClick={toggleTheme} />
            </div>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '2vh 1vw' }}>
          <Content>
            {/* This is where the component rendering magic happens. Depending on the value of "key" in Menu.Item, the render variable will change,
             therefore grabbing the correct component from SidebarComponents.js The function is determining what model to grab the key's respective component from.*/}
            {isUserMentee() && MenteeComponents[render]}
            {isUserMentor() && MentorComponents[render]}
            {isUserAdmin() && AdminComponents[render]}
          </Content>
        </Content>
      </Layout>
    </Layout>
  );
};
const mapStateToProps = state => {
  return { userProfile: state.user.userProfile };
};
export default connect(mapStateToProps)(Sidebar);

//Template for further role specific Menu.Items
//
// {isUserMentee() && (
//   <Menu.Item key="" onClick={handleMenuClick}>
//     Title
//   </Menu.Item>
// )}
