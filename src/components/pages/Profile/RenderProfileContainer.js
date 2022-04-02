import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import EditProfile from '../Profile/EditProfile';

// import '../Dashboard/Admin/index.css';
import { Row, Col, Typography, Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import {
  TwitterOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from '@ant-design/icons';

import axiosWithAuth from '../../../utils/axiosWithAuth';

const { Title } = Typography;
const { Meta } = Card;

const RenderProfileContainer = props => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axiosWithAuth()
      .get(`/profile/current_user_profile`)
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
        <Col span={6} style={{ padding: '1.8%' }}>
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
            style={{ width: 257, marginTop: 16 }}
            actions={[
              <TwitterOutlined />,
              <LinkedinOutlined />,
              <GithubOutlined />,
            ]}
          >
            <Meta title="Socials" description={<EditOutlined />} />
          </Card>
        </Col>
        <Col span={17}>
          <Title level={1}>{userData.name}</Title>
          <Card title="My Profile" extra={<EditProfile />}>
            <Card type="inner" title="Bio" extra={<EditOutlined />}>
              {userData.bio || 'Profile bio will go here.'}
            </Card>

            <Card type="inner" title="Full Name" extra={<EditOutlined />}>
              {userData.full_name || 'Full Name will go here.'}
            </Card>

            <Card type="inner" title="Email" extra={<EditOutlined />}>
              {userData.email || 'Email will go here.'}
            </Card>

            <Card type="inner" title="Location" extra={<EditOutlined />}>
              {userData.location || 'Location will go here.'}
            </Card>

            <Card type="inner" title="Company" extra={<EditOutlined />}>
              {userData.company || 'Company/Position will go here.'}
            </Card>

            <Card type="inner" title="Commitment" extra={<EditOutlined />}>
              {'Commitment will go here.'}
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
        </Col>
      </Row>
    </div>
  );
};

export default RenderProfileContainer;
