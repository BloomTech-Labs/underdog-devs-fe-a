import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './styles/Sidebar.css';
import { Layout, Menu, Switch as Toggle } from 'antd';
import {
  QuestionCircleOutlined,
  DollarOutlined,
  BulbOutlined,
  CalendarOutlined,
  ContainerOutlined,
  UserOutlined,
} from '@ant-design/icons';

import CalendarFeature from '../common/Calendar';
import RenderUpdateProfile from '../pages/UpdateProfile/RenderUpdateProfile';
import { DarkModeToggle, setTheme, getTheme } from './DarkModeToggle';
import { useEffect } from 'react';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = props => {
  const { authService } = props;

  const [collapsed, setCollapsed] = useState(false);
  const [render, updateRender] = useState(1);
  const [currentValue, setCurrentValue] = useState(false);


  //Set the default theme when the component is mounted
  useEffect(() => 
    setTheme(getTheme()), 
  []);


  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem('role_id');
  };

  const components = {
    1: <CalendarFeature />,
    2: <div>"Check Availabilities" Component goes here</div>,
    3: <div>"Schedule Meeting"</div>,
    4: <div>"View Assignments" Component goes here</div>,
    5: <div>"Create Assignments" Component goes here</div>,
    6: <div>"New Request" Component goes here</div>,
    7: <div>"Request Status" Component goes here</div>,
    8: <RenderUpdateProfile />,
    9: <div>"Account Settings" Component goes here</div>,
    11: <div>"Donate" Component goes here</div>,
    12: <div>"Support" Component goes here</div>,
  };

  const handleMenuClick = menu => {
    updateRender(menu.key);
  };

  const role = localStorage.role_id;

  const isUserMentee = () => {
    if (role === '4') {
      return true;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <SubMenu key="sub1" icon={<CalendarOutlined />} title="Schedule">
            <Menu.Item key="1" onClick={handleMenuClick}>
              Calendar
            </Menu.Item>
            <Menu.Item key="2" onClick={handleMenuClick}>
              Check Availabilities
            </Menu.Item>
            {isUserMentee() === true && (
              <Menu.Item key="3" onClick={handleMenuClick}>
                Schedule Meeting
              </Menu.Item>
            )}
          </SubMenu>
          {/* Assignments bar should be only visible to Mentees and Mentors */}
          <SubMenu key="sub2" icon={<ContainerOutlined />} title="Assignments">
            {/* "View Assignments" should only be visible to Mentees */}
            <Menu.Item key="4" onClick={handleMenuClick}>
              View Assignments
            </Menu.Item>
            {/* "Create Assignments" Should only be visible to Mentors */}
            <Menu.Item key="5" onClick={handleMenuClick}>
              Create Assignments
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<ContainerOutlined />} title="Requests">
            <Menu.Item key="6" onClick={handleMenuClick}>
              New Request
            </Menu.Item>
            <Menu.Item key="7" onClick={handleMenuClick}>
              Request Status
            </Menu.Item>
          </SubMenu>
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
          <Menu.Divider />
          <Menu.Item key="13" icon={<BulbOutlined />}>
            <div id="darkmode">
              Darkmode
              <Toggle size="small" id="darkModeToggle" onClick={DarkModeToggle} />
            </div>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '2vh 1vw' }}>
          <Content>{components[render]}</Content>
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
