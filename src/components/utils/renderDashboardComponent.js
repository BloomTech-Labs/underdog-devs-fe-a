import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../pages/Dashboard/Admin/index.css';
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

const RenderDashboardContainer = props => {
  const { content } = props;
  return (
    <Layout>
      {/* <Header className="header">
          <div className="logo" />
          <Menu className="theme" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header> */}
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
              <Link to="/pendingapproval">Pending Approval Requests</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<CalendarOutlined />}>
              <Link to="/availability">Mentor Mentee Availability</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<TeamOutlined />}>
              <Link to="/schedule">Schedule interviews</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<LaptopOutlined />}>
              <Link to="/manageresources">Manage Resources</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<LineChartOutlined />}>
              <Link to="/menteesprogress">Mentee's Progress</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item> */}
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 1000,
            }}
          >
            {content}
            <div />
            <Link to="/">Home</Link>
            <div />
            <Link to="/admindashboard">Back to dashboard</Link>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default RenderDashboardContainer;
