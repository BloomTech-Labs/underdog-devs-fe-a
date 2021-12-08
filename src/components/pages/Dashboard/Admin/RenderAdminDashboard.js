import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';

import {
  LaptopOutlined,
  LineChartOutlined,
  TeamOutlined,
  UserOutlined,
  CalendarOutlined,
  FormOutlined,
} from '@ant-design/icons';
import Item from 'antd/lib/list/Item';
import { Availability } from '../../Availability/Availability';
import { Profile } from '../../Profile/Profile';
import { Schedule } from '../../Schedule/Schedule';
import { MenteesProgress } from '../../MenteesProgress/MenteesProgress';
import { ManageResources } from '../../ManageResources/ManageResources';
import { PendingApproval } from '../../PendingApproval/PendingApproval';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function RenderAdminDashboard(props) {
  return (
    <Layout>
      <Layout>
        <Sider width={400} minHeight={1000} className="site-layout-background">
          <Menu
            className="siderTheme"
            mode="inline"
            defaultSelectedKeys={['0']}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/admindashboard/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<FormOutlined />}>
              <Link to="/admindashboard/pendingapproval">
                Pending Approval Requests
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<CalendarOutlined />}>
              <Link to="/admindashboard/availability">
                Mentor Mentee Availability
              </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<TeamOutlined />}>
              <Link to="/admindashboard/schedule">Schedule interviews</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<LaptopOutlined />}>
              <Link to="/admindashboard/resources">Manage Resources</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<LineChartOutlined />}>
              <Link to="/admindashboard/menteesprogress">
                Mentee's Progress
              </Link>
            </Menu.Item>
          </Menu>
          <Link to="/logout">Logout</Link>
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
            <Switch>
              <Route path="/admindashboard/main">
                <Content>Welcome to Admin Dashboard</Content>
              </Route>
              <Route path="/admindashboard/profile">
                <Profile />
              </Route>
              <Route path="/admindashboard/pendingapproval">
                <PendingApproval />
              </Route>
              <Route path="/admindashboard/availability">
                <Availability />
              </Route>
              <Route path="/admindashboard/schedule">
                <Schedule />
              </Route>
              <Route path="/admindashboard/resources">
                <ManageResources />
              </Route>
              <Route path="/admindashboard/menteesprogress">
                <MenteesProgress />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
export default RenderAdminDashboard;
