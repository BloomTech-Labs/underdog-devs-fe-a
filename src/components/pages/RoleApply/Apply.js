import React from 'react';
import './Styles/apply.css';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Space, Breadcrumb } from 'antd';
import { LoginOutlined, IdcardOutlined } from '@ant-design/icons';

const Apply = () => {
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
            <span>Apply</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>

      <Row className="row">
        <Col className="col1">
          <Card
            className="card1"
            hoverable
            cover={
              <img
                alt="example"
                className="card-img"
                src="https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                // style={{ height: '100%' }}
              />
            }
          >
            <Space
              className="outer-space-container"
              direction="vertical"
              align="baseline"
            >
              <Space direction="vertical">
                <Meta className="title" description="Join our MENTEE program" />
                <Meta
                  className="description"
                  description="Interested in acquiring the skills to become a Software Engineer? Apply to our Mentee program today to start learning."
                />
              </Space>

              <Link to="/apply/mentee">
                <Button className="button" type="primary" size="large" block>
                  Apply as a Mentee
                </Button>
              </Link>
            </Space>
          </Card>
        </Col>

        <Col className="col2">
          <Card
            hoverable
            className="card2"
            cover={
              <img
                alt="example"
                className="card-img"
                src="https://images.pexels.com/photos/1181337/pexels-photo-1181337.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                // style={{ height: '100%' }}
              />
            }
          >
            <Space
              className="outer-space-container"
              direction="vertical"
              align="baseline"
            >
              <Space direction="vertical">
                <Meta className="title" description="Join our MENTOR program" />
                <Meta
                  className="description"
                  description="Do you have a passion for teaching and Software Engineering? Apply to become a Mentor and help support our Mentees."
                />
              </Space>

              <Link to="/apply/mentor">
                <Button className="button" type="primary" size="large" block>
                  Apply as a Mentor
                </Button>
              </Link>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Apply;
