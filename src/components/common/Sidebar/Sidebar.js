import React, { useState, useLayoutEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import 'antd/dist/antd.css';
import '../styles/Sidebar.css';
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

import { DarkModeToggle, setTheme, getTheme } from '../DarkModeToggle';
import { useEffect } from 'react';
import { getAuthHeader } from '../../../api/index';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = props => {
  const { authService } = props;

  const [collapsed, setCollapsed] = useState(false);
  const [render, updateRender] = useState(1);
  const { authState } = useOktaAuth();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    getAuthHeader(authState);
  });

  //Sets the default theme and position of the toggle when the component is mounted and on when the toggle is changed.
  useLayoutEffect(() => {
    setTheme(getTheme());
  }, [toggle]);

  useLayoutEffect(() => {
    if (localStorage.theme === 'dark') {
      document.getElementById('darkModeToggle').className =
        'ant-switch ant-switch-small ant-switch-checked';
    } else if (localStorage.theme === 'light') {
      document.getElementById('darkModeToggle').className =
        'ant-switch ant-switch-small';
    }
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
  const role = localStorage.role_id;
  const isUserMentee = () => {
    if (role === '4') {
      return true;
    }
    return false;
  };
  const isUserMentor = () => {
    if (role === '3') {
      return true;
    }
    return false;
  };
  const isUserAdmin = () => {
    if (role === '2') {
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
          {isUserMentor() && (
            <Menu.Item key="3" onClick={handleMenuClick}>
              My Mentees
            </Menu.Item>
          )}
          {isUserMentor() ? (
            <SubMenu key="sub3" icon={<ContainerOutlined />} title="Resources">
              <Menu.Item key="6" onClick={handleMenuClick}>
                Request Resources
              </Menu.Item>
              <Menu.Item key="7" onClick={handleMenuClick}>
                Track Resources
              </Menu.Item>
            </SubMenu>
          ) : isUserAdmin() ? (
            <SubMenu key="sub2" icon={<ContainerOutlined />} title="Resources">
              <Menu.Item key="3" onClick={handleMenuClick}>
                Assign Resources
              </Menu.Item>
              <Menu.Item key="4" onClick={handleMenuClick}>
                Track Resources
              </Menu.Item>
            </SubMenu>
          ) : (
            <></>
          )}
          {isUserAdmin() && (
            <>
              <Menu.Item key="5" onClick={handleMenuClick}>
                Pending Applications
              </Menu.Item>
            </>
          )}
          {isUserAdmin() && (
            <>
              <Menu.Item key="6" onClick={handleMenuClick}>
                Manage Users
              </Menu.Item>
              <Menu.Item key="7" onClick={handleMenuClick}>
                View Support Requests
              </Menu.Item>
              <Menu.Item key="11" onClick={handleMenuClick}>
                View All Meetings
              </Menu.Item>
            </>
          )}
          <SubMenu key="sub4" icon={<UserOutlined />} title="Account">
            <Menu.Item key="8" onClick={handleMenuClick}>
              Profile Settings
            </Menu.Item>
            <Menu.Item key="9" onClick={handleMenuClick}>
              Account Settings
            </Menu.Item>
            <Menu.Item key="10" onClick={handleLogout}>
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
              <Toggle
                size="small"
                id="darkModeToggle"
                onChange={() => setToggle(!toggle)}
                onClick={DarkModeToggle}
              />
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

export default Sidebar;

//Template for further role specific Menu.Items
//
// {isUserMentee() === true && (
//   <Menu.Item key="" onClick={handleMenuClick}>
//     Title
//   </Menu.Item>
// )}
