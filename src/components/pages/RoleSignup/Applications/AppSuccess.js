import React from 'react';
import { Col, Row, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
const { Title } = Typography;

const AppSuccess = () => {
  return (
    <>
      <Row align="center" gutter={[16, 16]} style={{ marginTop: '5vh' }}>
        <Col span={24} align="middle">
          <Title level={2}>Thank you!</Title>
        </Col>
        <Col span={24} align="middle">
          <Typography>
            Your application was successfully submitted! Someone at Underdog
            Devs will contact you shortly in regards to your application
            approval.
          </Typography>
        </Col>
        <Link to="/">
          <Button className="button">Home</Button>
        </Link>
      </Row>
    </>
  );
};

export default AppSuccess;
