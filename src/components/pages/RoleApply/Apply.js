import React from 'react';
import './Styles/apply.css';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Space, Breadcrumb } from 'antd';
import { LoginOutlined, IdcardOutlined } from '@ant-design/icons';
import img1 from '../../../images/pexels-photo-7504837.png';
import img2 from '../../../images/pexels-photo-1181337.png';

import { useAuth0 } from '@auth0/auth0-react';

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
        <Col className="col1">
          <Card
            className="card1"
            hoverable
            cover={
              <img
                alt="example"
                className="card-img"
                src={img1}
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
                src={img2}
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
