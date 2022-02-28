import React from 'react';
import './Styles/signup.css';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Divider, Space, Breadcrumb } from 'antd';
import { LoginOutlined, IdcardOutlined } from '@ant-design/icons';

const Signup = () => {
  const { Meta } = Card;

  return (
    <div>
      <Row style={{ padding: '3vh' }}>
        <Breadcrumb>
          <Breadcrumb.Item href="/login">
            <LoginOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <IdcardOutlined />
            <span>Signup</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>

      <Row className="row">
        <Col sm={3} md={2} lg={1} className="col1">
          <Card
            className="card1"
            hoverable
            cover={
              <img
                alt="example"
                className="card-img"
                src="https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                style={{ height: '100%' }}
              />
            }
          >
            <Space
              className="outer-space-container"
              direction="horizontal"
              align="center"
            >
              <Space direction="vertical">
                <Meta className="title" description="Join our MENTEE program" />
                <Meta
                  className="description"
                  description="Interested in acquiring the skills to become a Software Engineer? Apply to our Mentee program today to start learning."
                />
              </Space>

              <Divider
                className="divider"
                type="vertical"
                style={{ height: 100 }}
              />

              <Link to="/menteeapplication">
                <Button className="button" type="primary" block>
                  MENTEE
                </Button>
              </Link>
            </Space>
          </Card>
        </Col>

        <Col sm={3} md={2} lg={1} className="col2">
          <Card
            hoverable
            className="card2"
            cover={
              <img
                alt="example"
                className="card-img"
                src="https://images.pexels.com/photos/1181337/pexels-photo-1181337.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                style={{ height: '100%' }}
              />
            }
          >
            <Space
              className="outer-space-container"
              direction="horizontal"
              align="center"
            >
              <Space direction="vertical">
                <Meta className="title" description="Join our MENTOR program" />
                <Meta
                  className="description"
                  description="Do you have a passion for teaching and Software Engineering? Apply to become a Mentor and help support our Mentees."
                />
              </Space>

              <Divider
                className="divider"
                type="vertical"
                style={{ height: 100 }}
              />

              <Link to="/mentorapplication">
                <Button className="button" type="primary" block>
                  MENTOR
                </Button>
              </Link>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Signup;
