import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import 'antd/dist/antd.css';
import '../styles/Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Modal, Menu, Switch as Toggle } from 'antd';
import {
  DashboardOutlined,
  BookOutlined,
  ContainerOutlined,
  ContactsOutlined,
  UsergroupAddOutlined,
  ProjectOutlined,
  CarryOutOutlined,
  QuestionCircleOutlined,
  BulbOutlined,
  CalendarOutlined,
  UserOutlined,
  FormOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import useTheme from '../../../hooks/useTheme';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = ({ children, userProfile }) => {
  const { role_id } = userProfile;
  const [modal, setModal] = useState(false);
  const { authService } = useOktaAuth();
  const { push } = useHistory();
  const { pathname } = useLocation();

  const [theme, toggleTheme] = useTheme();

  const openModal = () => setModal(true);

  const cancelOpen = () => setModal(false);

  const handleLogout = () => {
    setModal(false);
    localStorage.removeItem('role_id');
    localStorage.removeItem('token');
    authService.logout();
  };

  const handleMenuClick = menu => {
    push(menu.key);
  };

  // This is determining which role is currently in session, implemented further in ternary statements in the return clause
  const isUserMentee = () => role_id === 4;
  const isUserMentor = () => role_id === 3;
  const isUserAdmin = () => role_id <= 2;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider id="sidebar" trigger={null} breakpoint="lg" collapsible={true}>
        <Menu theme="dark" defaultSelectedKeys={[pathname]} mode="inline">
          <SubMenu key="sub1" icon={<CalendarOutlined />} title="Schedule">
            <Menu.Item key="/calendar" onClick={handleMenuClick}>
              Calendar
            </Menu.Item>
            {isUserMentee() && (
              <Menu.Item key="/meetings" onClick={handleMenuClick}>
                Upcoming Meetings
              </Menu.Item>
            )}
            {isUserMentor() && (
              <>
                <Menu.Item key="/meetings/schedule" onClick={handleMenuClick}>
                  Schedule Meeting
                </Menu.Item>
              </>
            )}
            {isUserAdmin() && (
              <Menu.Item key="/meetings/schedule" onClick={handleMenuClick}>
                Schedule Interview
              </Menu.Item>
            )}
          </SubMenu>
          {isUserMentee() && (
            <>
              <Menu.Item key="/assignments" onClick={handleMenuClick}>
                My Assignments
              </Menu.Item>
              <Menu.Item key="/resources" onClick={handleMenuClick}>
                Access Resources
              </Menu.Item>
            </>
          )}
          {isUserMentor() ? (
            <>
              <Menu.Item key="/mentees" onClick={handleMenuClick}>
                My Mentees
              </Menu.Item>
              <Menu.Item
                key="/resources"
                icon={<BookOutlined />}
                onClick={handleMenuClick}
              >
                Manage Resources
              </Menu.Item>
              <Menu.Item key="/addMenteeReview" onClick={handleMenuClick}>
                Add Mentee Review
              </Menu.Item>
            </>
          ) : isUserAdmin() ? (
            <>
              <Menu.Item
                key="/dashboard"
                icon={<DashboardOutlined />}
                onClick={handleMenuClick}
              >
                Dashboard
              </Menu.Item>
              <Menu.Item
                key="/resources"
                icon={<BookOutlined />}
                onClick={handleMenuClick}
              >
                Manage Resources
              </Menu.Item>
              <Menu.Item
                key="/applications"
                icon={<ContainerOutlined />}
                onClick={handleMenuClick}
              >
                Pending Applications
              </Menu.Item>
              <Menu.Item
                key="/matching"
                icon={<UsergroupAddOutlined />}
                onClick={handleMenuClick}
              >
                Matching
              </Menu.Item>
              <Menu.Item
                key="/users"
                icon={<ContactsOutlined />}
                onClick={handleMenuClick}
              >
                Manage Users
              </Menu.Item>
              <Menu.Item
                key="/notes"
                icon={<FormOutlined />}
                onClick={handleMenuClick}
              >
                Attendance
              </Menu.Item>
              <Menu.Item
                key="/support"
                icon={<ProjectOutlined />}
                onClick={handleMenuClick}
              >
                View Support Requests
              </Menu.Item>
              <Menu.Item
                key="/meetings"
                icon={<CarryOutOutlined />}
                onClick={handleMenuClick}
              >
                View All Meetings
              </Menu.Item>
              <Menu.Item key="/reviews" onClick={handleMenuClick}>
                View Reviews
              </Menu.Item>
              <Menu.Item key="/addMenteeReview" onClick={handleMenuClick}>
                Add Mentee Review
              </Menu.Item>
            </>
          ) : (
            <></>
          )}
          {isUserAdmin() === false && (
            <>
              <Menu.Item
                key="/support"
                icon={<QuestionCircleOutlined />}
                onClick={handleMenuClick}
              >
                Support
              </Menu.Item>
            </>
          )}
          <Menu.Divider />
          <Menu.Item key="14" icon={<BulbOutlined />}>
            <div id="darkmode">
              Darkmode
              <Toggle
                size="small"
                id="darkModeToggle"
                onClick={toggleTheme}
                checked={theme === 'dark' ? true : false}
              />
            </div>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '2vh 1vw' }}>
          <Content>{children}</Content>
        </Content>
      </Layout>
    </Layout>
  );
};
const mapStateToProps = state => {
  return { userProfile: state.user.userProfile };
};
export default connect(mapStateToProps)(Sidebar);
