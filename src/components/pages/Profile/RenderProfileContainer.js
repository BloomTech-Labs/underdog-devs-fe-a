import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import EditProfile from '../Profile/EditProfile';

import '../../../styles/styles.css';
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
      <Row className="profileContainer">
        <Col span={2} xl={8} md={8} xs={24} sm={24} lg={8}>
          <Card
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
            style={{ marginTop: 16 }}
            actions={[
              <TwitterOutlined />,
              <LinkedinOutlined />,
              <GithubOutlined />,
            ]}
          >
            <Meta title="Socials" description={<EditOutlined />} />
          </Card>
        </Col>
        <Col span={2} xl={16} md={16} xs={24} sm={24} lg={16}>
          <Title level={1}>{userData.name}</Title>
          <Card
            headStyle={{ color: 'rgb(255, 255, 255, 0.85)' }}
            title="My Profile"
            extra={<EditProfile />}
          >
            <Card type="inner" title="Bio" extra={<EditOutlined />}>
              {userData.bio || 'Profile bio will go here.'}
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="Full Name"
              extra={<EditOutlined />}
            >
              {userData.full_name || 'Full Name will go here.'}
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="Email"
              extra={<EditOutlined />}
            >
              {userData.email || 'Email will go here.'}
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="Location"
              extra={<EditOutlined />}
            >
              {userData.location || 'Location will go here.'}
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="Company"
              extra={<EditOutlined />}
            >
              {userData.company || 'Company/Position will go here.'}
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="Commitment"
              extra={<EditOutlined />}
            >
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
