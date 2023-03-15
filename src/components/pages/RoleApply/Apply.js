import React from 'react';
import './Styles/apply.css';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Space, Breadcrumb } from 'antd';
import { LoginOutlined, IdcardOutlined } from '@ant-design/icons';
import img1 from '../../../images/pexels-photo-7504837.png';
import img2 from '../../../images/pexels-photo-1181337.png';
import { useAuth0 } from '@auth0/auth0-react';
const data = [
  {
    img: img1,
    link: '/apply/mentee',
    role: 'Mentee',
    description:
      'Interested in acquiring the skills to become a Software Engineer? Apply to our Mentee program today to start learning.',
  },
  {
    img: img2,
    link: '/apply/mentor',
    role: 'Mentor',
    description:
      'Do you have a passion for teaching and Software Engineering? Apply to become a Mentor and help support our Mentees.',
  },
];
const Apply = () => {
  const { Meta } = Card;

  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <Row style={{ padding: '3vh' }}>
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => loginWithRedirect()}>
            <LoginOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <IdcardOutlined />
            <span>Apply</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>

      <Row className="row">
        {data.map(col => {
          return (
            <Col className="col1">
              <Card
                className="card1"
                hoverable
                cover={<img alt="example" className="card-img" src={col.img} />}
              >
                <Space
                  className="outer-space-container"
                  direction="vertical"
                  align="baseline"
                >
                  <Space direction="vertical">
                    <Meta
                      className="title"
                      description={`Join our ${col.role.toUpperCase()} program`}
                    />
                    <Meta
                      className="description"
                      description={col.description}
                    />
                  </Space>

                  <Link to={col.link}>
                    <Button
                      className="button"
                      type="primary"
                      size="large"
                      block
                    >
                      Apply as a {col.role}
                    </Button>
                  </Link>
                </Space>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Apply;
