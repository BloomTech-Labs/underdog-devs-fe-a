import React, { useEffect } from 'react';
// import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { connect } from 'react-redux';
import { getProfile } from '../../../state/actions/userProfile/getProfile';
import Applications from '../Applications/Applications';
import MyMentees from '../../pages/MyMentees/MyMentees';
import MyMentors from '../../pages/MyMentors/MyMentors';
import LandingPage from '../LandingPage/LandingPage';
// import { Statistic, Row, Col, Table } from 'antd';

const Dashboard = props => {
  // const { axiosWithAuth } = useAxiosWithAuth0();
  // const getAccounts = (dispatch) => {
  //   axiosWithAuth()
  //     .get('/profile/current_user_profile/')
  //     .then(res => {
  //       console.log()
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
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // };
  // useEffect(() => {
  //  if (!role_id) {
  //     props.getProfile();
  //   } else {
  //     props.getAccounts()
  //   }
  // }, []);
  //      switch (role_id) {
  //         case 1: // SuperAdmin
  //           return <Applications />;
  //         case 2: // Admin
  //           return <Applications />;
  //         case 3: // mentors
  //           return <MyMentees />;
  //         case 4: // mentees
  //           return <MyMentors />;
  //         default: //no role or dev
  //           return <LandingPage />;
  //       }
};

const mapStateToProps = state => {
  return { user: state.userReducer };
};

export default connect(mapStateToProps, { getProfile })(Dashboard);
