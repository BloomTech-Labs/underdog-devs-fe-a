import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import EditProfile from '../Profile/EditProfile';
// import '../Dashboard/Admin/index.css';
import { Layout, Menu, Breadcrumb, Row, Col, Typography, Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import {
  TwitterOutlined,
  LinkedinOutlined,
  FacebookOutlined,
} from '@ant-design/icons';

import {
  AppstoreOutlined,
  LaptopOutlined,
  LineChartOutlined,
  TeamOutlined,
  UserOutlined,
  CalendarOutlined,
  FormOutlined,
} from '@ant-design/icons';
import axiosWithAuth from '../../../utils/axiosWithAuth';

const { SubMenu } = Menu;
const { Title } = Typography;
const { Meta } = Card;

const RenderProfileContainer = props => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axiosWithAuth()
      .get(`/profiles/current_user_profile`)
      .then(resp => {
        setUserData(resp.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  }, []);

  return (
    <div>
      <Row style={{ height: '100vh' }}>
        <Col span={6} style={{ padding: '3%' }}>
          <Card
            style={{ padding: '2%' }}
            cover={
              <img
                alt="profile owner"
                src={
                  userData.image ||
                  'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                }
              />
            }
          >
            <Typography>{userData.location}</Typography>
            <Typography>{userData.email}</Typography>
          </Card>
          <Card
            style={{ width: 300, marginTop: 16 }}
            actions={[
              <TwitterOutlined />,
              <LinkedinOutlined />,
              <FacebookOutlined />,
            ]}
          >
            <Meta title="Socials" description={<EditOutlined />} />
          </Card>
        </Col>
        <Col span={18}>
          <Title level={1}>{userData.name}</Title>
          <Card title="My Profile">
            <Card type="inner" title="Bio" extra={<EditOutlined />}>
              {userData.bio || 'Profile bio will go here.'}
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="My Tech Stack"
              extra={<EditOutlined />}
            >
              {/* 
              How it will look after survey adds each tech to an array on BE
              <ul>
                {userData.tech_stack.map(tech => {
                  return <li>{tech}</li>;
                })}
              </ul> */}
              {userData.tech_stack}
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="My Mentoring Topics"
              extra={<EditOutlined />}
            >
              {userData.topics || 'Topics will go here.'}
            </Card>
          </Card>
          <EditProfile />
        </Col>
      </Row>
    </div>
  );
};

export default RenderProfileContainer;
