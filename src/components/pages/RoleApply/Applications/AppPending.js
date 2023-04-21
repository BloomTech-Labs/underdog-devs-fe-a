import React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Typography, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;

function AppPending(props) {
  let history = useHistory();
  const handleHomeClick = () => {
    history.push('/');
  };

  let { currentUser } = props;

  return (
    <>
      <Row align="center" gutter={[16, 16]} style={{ marginTop: '5vh' }}>
        <Col span={24} align="middle">
          <Title level={2}>Pending Application</Title>
        </Col>
        <Col span={24} align="middle">
          <Typography>
            Hello {currentUser.first_name}! Your {currentUser.role} application
            is still under review! Keep an eye on your email, as we'll email you
            if your application has been approved.
          </Typography>
        </Col>
        <Button onClick={handleHomeClick}>Home</Button>
      </Row>
    </>
  );
}

const mapStateToProps = state => {
  return { currentUser: state.user.currentUser };
};

export default connect(mapStateToProps)(AppPending);
