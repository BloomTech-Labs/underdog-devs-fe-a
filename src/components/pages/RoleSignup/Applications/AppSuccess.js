import React, { useState, useEffect } from 'react';
import { Col, Row, Typography, Button } from 'antd';
import { NavItems, NavBtn, NavBtnLink } from '../../NavBarLanding/NavBarStyle';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfile } from '../../../../state/actions/userProfile/getProfile';
import axiosWithAuth from '../../../../utils/axiosWithAuth';
const { Title } = Typography;

const AppSuccess = ({ isAuthenticated, getProfile }) => {
  let history = useHistory();
  const handleHomeClick = () => {
    history.push('/landing');
  };

  const [user, setUser] = useState({});
  useEffect(() => {
    axiosWithAuth()
      .get(`/profile/current_user_profile/`)
      .then(user => {
        setUser(user.data);
        getProfile(user.data.profile_id);
      });
  }, [isAuthenticated]);

  return (
    <>
      <Row align="center" gutter={[16, 16]} style={{ marginTop: '5vh' }}>
        <Col span={24} align="middle">
          <Title level={2}>Thank you {user.first_name}!</Title>
        </Col>
        <Col span={24} align="middle">
          <Typography>
            Your application has been received, keep an eye on your email, as
            we'll email you if your application has been approved.
          </Typography>
        </Col>
        <NavItems>
          <NavBtn>
            <NavBtnLink onClick={handleHomeClick}>Home</NavBtnLink>
          </NavBtn>
        </NavItems>
      </Row>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: localStorage.getItem('token'),
    userProfile: state.user.userProfile,
  };
};

export default connect(mapStateToProps, { getProfile })(AppSuccess);
