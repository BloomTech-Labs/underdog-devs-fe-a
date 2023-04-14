import { useAuth0 } from '@auth0/auth0-react';
import { connect } from 'react-redux';
import { getProfile } from '../../../state/actions/userProfile/getProfile';
import Applications from '../Applications/Applications';
import MyMentees from '../../pages/MyMentees/MyMentees';
import MyMentors from '../../pages/MyMentors/MyMentors';
import LandingPage from '../LandingPage/LandingPage';
import Mentee from '../RoleApply/Applications/Mentee';
import Mentor from '../RoleApply/Applications/Mentor';

const Dashboard = props => {
  const { user } = useAuth0();
  const { currentUser } = props;
  /*
   ** Following 2 lines check for user_metadata from Auth0 - if this data
   ** exists, current user is new and needs to fill out form, so we
   ** push them there.
   */
  // const newUser =
  //   user[`${process.env.REACT_APP_AUTH0_IDTOKEN_IDENTIFIER}/newUser`];
  // const newUserRole =
  //   user[`${process.env.REACT_APP_AUTH0_IDTOKEN_IDENTIFIER}/role`];
  console.log(currentUser);
  // console.log(newUser);
  // console.log(newUserRole);
  if (currentUser.role === 'admin') {
    return <Applications />;
  } else if (!currentUser.tempProfile && currentUser.role === 'mentor') {
    return <MyMentees />;
  } else if (!currentUser.tempProfile && currentUser.role === 'mentee') {
    return <MyMentors />;
  } else if (currentUser.tempProfile && currentUser.role === 'mentor') {
    return <Mentor />;
  } else if (currentUser.tempProfile && currentUser.role === 'mentee') {
    return <Mentee />;
  } else {
    return <LandingPage />;
  }
};

const mapStateToProps = state => {
  return { currentUser: state.user.currentUser };
};

export default connect(mapStateToProps, { getProfile })(Dashboard);
