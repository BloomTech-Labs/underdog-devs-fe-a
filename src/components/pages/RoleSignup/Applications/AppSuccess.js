import React, { useState, useEffect } from 'react';
import { Col, Row, Typography, Button } from 'antd';
import { connect } from 'react-redux';
import { getProfile } from '../../../../state/actions/userProfile/getProfile';
import axiosWithAuth from '../../../../utils/axiosWithAuth';
import { useOktaAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';
const { Title } = Typography;

const AppSuccess = ({ isAuthenticated, userProfile, getProfile }) => {
  const [user, setUser] = useState({});
  console.log(
    `Welcome ${user.first_name}. Your profile id is ${user.profile_id}`
  );
  useEffect(() => {
    axiosWithAuth()
      .get(`/profile/current_user_profile/`)
      .then(user => {
        setUser(user.data);
        getProfile(user.data.profile_id);
        console.log('user: ', user);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    console.log('Inisde second useEffect??');
    axiosWithAuth()
      .get(`/application/profileId/:${user.profile_id}`)
      .then(res => {
        console.log('res: ', res);
      })
      .catch(err => {
        console.log('');
      });
    // eslint-disable-next
  }, [user.profile_id]);

  return (
    true && (
      <>
        <Row align="center" gutter={[16, 16]} style={{ marginTop: '5vh' }}>
          <Col span={24} align="middle">
            <Title level={2}>Thank you {user.first_name}!</Title>
          </Col>
          <Col span={24} align="middle">
            <Typography>
              Your application was successfully submitted! Someone at Underdog
              Devs will contact you shortly in regards to your application
              approval.
              {
                // Potential other text: “Your application has been received, keep an eye on your email, as we'll email you when your application has been approved.”
              }
            </Typography>
          </Col>
          {/* <Link to="/login">
            <Button className="button">Logout</Button>
          </Link> */}
        </Row>
      </>
    )
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: localStorage.getItem('token'),
    userProfile: state.user.userProfile,
  };
};

export default connect(mapStateToProps, { getProfile })(AppSuccess);
