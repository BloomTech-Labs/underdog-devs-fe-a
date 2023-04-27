import React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Typography, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;

function AppRejected(props) {
  let history = useHistory();
  const handleHomeClick = () => {
    history.push('/');
  };

  let { currentUser } = props;

  return (
    <>
      <Row align="center" gutter={[16, 16]} style={{ marginTop: '35vh' }}>
        <Col span={24} align="middle">
          <Typography>
            You are not currently an active member of Underdog Devs. If you
            believe you have reached this page in error email{' '}
            <a href="mailto:underdogdevs@gmail.com">underdogdevs@gmail.com</a>
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

export default connect(mapStateToProps)(AppRejected);
