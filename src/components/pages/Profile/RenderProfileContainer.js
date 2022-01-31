import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
// import '../Dashboard/Admin/index.css';
import { Layout, Menu, Breadcrumb, Row, Col, Typography, Card } from 'antd';
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
const { Title } = Typography;
const { Meta } = Card;

const RenderProfileContainer = props => {
  return (
    // <Layout>
    //   <Header className="header">
    //       <div className="logo" />
    //       <Menu className="theme" mode="horizontal" defaultSelectedKeys={['2']}>
    //         <Menu.Item key="1">nav 1</Menu.Item>
    //         <Menu.Item key="2">nav 2</Menu.Item>
    //         <Menu.Item key="3">nav 3</Menu.Item>
    //       </Menu>
    //     </Header>
    //   <Layout>
    //     <Sider width={400} minHeight={1000} className="site-layout-background">
    //       <Menu
    //         className="siderTheme"
    //         mode="inline"
    //         defaultSelectedKeys={['4']}
    //       >
    //         <Menu.Item key="1" icon={<UserOutlined />}>
    //           <Link to="/profile">Profile</Link>
    //         </Menu.Item>
    //         <Menu.Item key="2" icon={<FormOutlined />}>
    //           <Link to="/pendingapproval">Pending Approval Requests</Link>
    //         </Menu.Item>
    //         <Menu.Item key="3" icon={<CalendarOutlined />}>
    //           Mentor Mentee Availability
    //         </Menu.Item>
    //         <Menu.Item key="4" icon={<TeamOutlined />}>
    //           Schedule interviews
    //         </Menu.Item>
    //         <Menu.Item key="5" icon={<LaptopOutlined />}>
    //           Manage Resources
    //         </Menu.Item>
    //         <Menu.Item key="6" icon={<LineChartOutlined />}>
    //           Mentee's Progress
    //         </Menu.Item>
    //       </Menu>
    //     </Sider>
    //     <Layout style={{ padding: '0 24px 24px' }}>
    //       <Breadcrumb style={{ margin: '16px 0' }}>
    //         <Breadcrumb.Item>Home</Breadcrumb.Item>
    //           <Breadcrumb.Item>List</Breadcrumb.Item>
    //           <Breadcrumb.Item>App</Breadcrumb.Item>
    //       </Breadcrumb>
    //       <Content
    //         className="site-layout-background"
    //         style={{
    //           padding: 24,
    //           margin: 0,
    //           minHeight: 1000,
    //         }}
    //       >
    //         xyz's profile
    //         <div />
    //         <Link to="/">Home</Link>
    //         <div />
    //         <Link to="/admindashboard">Back to dashboard</Link>
    //       </Content>
    //     </Layout>
    //   </Layout>
    // </Layout>
    <div>
      <Row style={{ height: '100vh', border: '1px solid red' }}>
        <Col span={6} style={{ border: '1px solid blue', padding: '3%' }}>
          <Title level={2}>Testing 123</Title>
          <Card
            style={{ padding: '2%' }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta description="123 testing" />
          </Card>
        </Col>
        <Col span={18} style={{ border: '1px solid white' }}>
          <Title level={1}>Joe Schmoe</Title>
          <Card title="My Profile">
            <Card
              type="inner"
              title="Mentee Profile>"
              extra={<a href="#">Edit</a>}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              vitae odio eu ante scelerisque pulvinar in vel arcu. Aenean a
              varius massa. Nulla ac vehicula magna. Nam facilisis tellus ac
              ipsum viverra maximus nec id quam. Donec mauris ligula, ultricies
              ac sapien eu, placerat varius magna. Donec sit amet turpis quis
              nisi blandit malesuada. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed volutpat leo sed mi consequat, vel pharetra
              ligula ultricies. Nam eu metus sodales, consectetur metus at,
              aliquet sem.
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="My mentee Relationships"
              extra={<a href="#">Edit</a>}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              vitae odio eu ante scelerisque pulvinar in vel arcu. Aenean a
              varius massa. Nulla ac vehicula magna. Nam facilisis tellus ac
              ipsum viverra maximus nec id quam. Donec mauris ligula, ultricies
              ac sapien eu, placerat varius magna. Donec sit amet turpis quis
              nisi blandit malesuada. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed volutpat leo sed mi consequat, vel pharetra
              ligula ultricies. Nam eu metus sodales, consectetur metus at,
              aliquet sem.
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="Mentoring Topics"
              extra={<a href="#">Edit</a>}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              vitae odio eu ante scelerisque pulvinar in vel arcu. Aenean a
              varius massa. Nulla ac vehicula magna. Nam facilisis tellus ac
              ipsum viverra maximus nec id quam. Donec mauris ligula, ultricies
              ac sapien eu, placerat varius magna. Donec sit amet turpis quis
              nisi blandit malesuada. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed volutpat leo sed mi consequat, vel pharetra
              ligula ultricies. Nam eu metus sodales, consectetur metus at,
              aliquet sem.
            </Card>
          </Card>
          ,
        </Col>
      </Row>
    </div>
  );
};

export default RenderProfileContainer;
