import React, { useEffect } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { useAuth0 } from '@auth0/auth0-react';
import { connect } from 'react-redux';
import { getProfile } from '../../../state/actions/userProfile/getProfile';
import Applications from '../Applications/Applications';
import MyMentees from '../../pages/MyMentees/MyMentees';
import MyMentors from '../../pages/MyMentors/MyMentors';
import LandingPage from '../LandingPage/LandingPage';
// import { Statistic, Row, Col, Table } from 'antd';

const Dashboard = props => {
  const { user } = useAuth0();

  const { axiosWithAuth } = useAxiosWithAuth0();
  const getAccounts = dispatch => {
    axiosWithAuth()
      .get('/profile/current_user_profile/')
      .then(res => {
        //       // setRole(
        //       //   res.data.role_id === 1
        //       //     ? 'Super Admin'
        //       //     : res.data.role_id === 2
        //       //     ? 'Admin'
        //       //     : res.data.role_id === 3
        //       //     ? 'Mentor'
        //       //     : res.data.role_id === 4
        //       //     ? 'Mentee'
        //       //     : res.data.role_id === 5
        //       //     ? 'Developer'
        //       //     : 'pending'
        //       // );
      })
      .catch(err => {
        console.error(err);
      });
  };
  // useEffect(() => {
  //   if (!props.role_id) {
  //     props.getProfile();
  //   } else {
  //     props.getAccounts();
  //   }
  // }, []);

  if (user.email.includes('002')) {
    return <Applications />;
  } else if (user.email.includes('003')) {
    return <MyMentees />;
  } else if (user.email.includes('004')) {
    return <MyMentors />;
  } else {
    return <LandingPage />;
  }

  // switch (props.user) {
  //   case 1: // SuperAdmin 002
  //     return <Applications />;
  //   case 2: // Mentors 003
  //     return <MyMentees />;
  //   case 3: // Mentees 004
  //     return <MyMentors />;
  //   default: //Guest 005
  //     return <LandingPage />;
  // }
};

const mapStateToProps = state => {
  return { user: state.userReducer };
};

export default connect(mapStateToProps, { getProfile })(Dashboard);
