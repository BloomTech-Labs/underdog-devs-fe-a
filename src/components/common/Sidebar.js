import React from 'react';
import { Link } from 'react-dom';
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

import Calendar from '../common/Calendar';
import { UpdateProfile } from '../pages/UpdateProfile';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

class Sidebar extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  onChange = checked => {
    console.log(`switch to ${checked}`);
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu key="sub1" icon={<CalendarOutlined />} title="Schedule">
              <Menu.Item key="1">
                Calendar
                {/* <a href='/calendarfeature'>Calendar</a> */}
              </Menu.Item>
              <Menu.Item key="2">Check Availabilities</Menu.Item>
              <Menu.Item key="3">Schedule Meeting</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<ContainerOutlined />} title="Tickets">
              <Menu.Item key="4">Open Ticket</Menu.Item>
              <Menu.Item key="5">Ticket Status</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<UserOutlined />} title="Account">
              <Menu.Item key="6">Profile Settings</Menu.Item>
              <Menu.Item key="7">Account Settings</Menu.Item>
              <Menu.Item key="8">Log Out</Menu.Item>
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
            <UpdateProfile />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Sidebar;
