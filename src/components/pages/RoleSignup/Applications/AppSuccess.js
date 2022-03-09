import React from 'react';
import { Col, Row, Typography } from 'antd';
const { Title } = Typography;

const AppSuccess = () => {
  return (
    <>
      <Row align="center" gutter={[16, 16]} style={{ margin: '3rem' }}>
        <Col span={24} align="middle">
          <Title level={2}>Thank you!</Title>
        </Col>
        <Col span={15} align="middle">
          <Typography>
            Your application was successfully submitted! Someone at Underdog
            Devs or a member of the staff will contact you shortly in regards to
            your application approval.
          </Typography>
        </Col>
      </Row>
    </>
  );
};

export default AppSuccess;
