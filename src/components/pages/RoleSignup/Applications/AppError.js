import React from 'react';
import { Col, Row, Typography } from 'antd';
const { Title } = Typography;

const AppError = () => {
  return (
    <>
      <Row align="center" gutter={[8, 8]} style={{ marginTop: '3vh' }}>
        <Col span={24} align="middle">
          <Title level={2}>We're sorry!</Title>
        </Col>
        <Col span={24} align="middle">
          <Typography>
            Something went wrong. Please re-apply and try again later.
          </Typography>
        </Col>
      </Row>
    </>
  );
};

export default AppError;
