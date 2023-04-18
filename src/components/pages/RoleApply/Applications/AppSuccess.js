import React from 'react';
import { Col, Row, Typography, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;

export default function AppSuccess() {
  let history = useHistory();
  const handleHomeClick = () => {
    history.push('/');
  };

  return (
    <>
      <Row align="center" gutter={[16, 16]} style={{ marginTop: '5vh' }}>
        <Col span={24} align="middle">
          <Title level={2}>Thank you!</Title>
        </Col>
        <Col span={24} align="middle">
          <Typography>
            Your application has been received, keep an eye on your email, as
            we'll email you if your application has been approved.
          </Typography>
        </Col>
        <Button onClick={handleHomeClick}>Home</Button>
      </Row>
    </>
  );
}
