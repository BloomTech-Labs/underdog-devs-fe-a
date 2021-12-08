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

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = props => {
  const { userInfo, authService } = props;

  const [collapsed, setCollapsed] = useState(false);
  const [render, updateRender] = useState(1);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const handleLogout = checked => {
    authService.logout();
    localStorage.removeItem('role_id');
  };

  const components = {
    1: <CalendarFeature />,
    2: <div>Option 2</div>,
    3: <div>Option 3</div>,
    4: <div>Option 4</div>,
    5: <div>Option 5</div>,
    6: <RenderUpdateProfile />,
    7: <div>Option 7</div>,
    8: <div>Option 8</div>,
    9: <div>Option 9</div>,
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
          <SubMenu key="sub2" icon={<ContainerOutlined />} title="Requests">
            <Menu.Item key="4" onClick={handleMenuClick}>
              Open Ticket
            </Menu.Item>
            <Menu.Item key="5" onClick={handleMenuClick}>
              Ticket Status
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<UserOutlined />} title="Account">
            <Menu.Item key="6" onClick={handleMenuClick}>
              Profile Settings
            </Menu.Item>
            <Menu.Item key="7" onClick={handleMenuClick}>
              Account Settings
            </Menu.Item>
            <Menu.Item key="8" onClick={handleLogout}>
              Log Out
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<DollarOutlined />}>
            Donate
          </Menu.Item>
          <Menu.Item key="10" icon={<QuestionCircleOutlined />}>
            Support
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="11" icon={<BulbOutlined />}>
            <div id="darkmode">
              Darkmode
              <Toggle size="small" />
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
