import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Calendar } from 'antd';

import {
  AppstoreOutlined,
  LaptopOutlined,
  LineChartOutlined,
  TeamOutlined,
  UserOutlined,
  CalendarOutlined,
  FormOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function onPanelChange(value, mode) {
  console.log(value.format('YYYY-MM-DD'), mode);
}

function RenderMentorDash(props) {
  return (
    <Layout>
      <Layout>
        <Sider width={400} minHeight={1000} className="site-layout-background">
          <Menu
            className="siderTheme"
            mode="inline"
            defaultSelectedKeys={['4']}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<FormOutlined />}>
              <Link to="/pendingapproval">Edit Profile</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<CalendarOutlined />}>
              Schedule Meeting
            </Menu.Item>
            <Menu.Item key="8" icon={<TeamOutlined />}>
              Meeting Report
            </Menu.Item>
            <Menu.Item key="5" icon={<TeamOutlined />}>
              Track Internal Resources
            </Menu.Item>
            <Menu.Item key="6" icon={<TeamOutlined />}>
              Assigned Mentees
            </Menu.Item>
            <Menu.Item key="7" icon={<TeamOutlined />}>
              Mentees Progress
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 1000,
            }}
          >
            Welcome to Mentor Dashboard
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
export default RenderMentorDash;
