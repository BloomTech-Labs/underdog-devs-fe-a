import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
// import '../Dashboard/Admin/index.css';
import { Layout, Menu, Breadcrumb, Row, Col, Typography, Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import {
  TwitterOutlined,
  LinkedinOutlined,
  FacebookOutlined,
} from '@ant-design/icons';
import { Calendar } from 'antd';
import { Skeleton } from 'antd';

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
const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { Meta } = Card;

const profileInitialValues = {
  profile_id: '',
  email: '',
  location: '',
  name: '',
  current_comp: '',
  tech_stack: '',
  can_commit: null,
  how_commit: '',
  other_info: null,
};

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

  console.log(userData);
  return (
    <div>
      <Row style={{ height: '100vh', border: '1px solid red' }}>
        <Col span={6} style={{ border: '1px solid blue', padding: '3%' }}>
          <Card
            style={{ padding: '2%' }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta
              title="address and contact info will go here"
              description={<EditOutlined />}
            />
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
        <Col span={18} style={{ border: '1px solid white' }}>
          <Title level={1}>Joe Schmoe</Title>
          <Card title="My Profile">
            <Card type="inner" title="Bio" extra={<EditOutlined />}>
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
              title="My Tech Stack"
              extra={<EditOutlined />}
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
              title="My Mentoring Topics"
              extra={<EditOutlined />}
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
