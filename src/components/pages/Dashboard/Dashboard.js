import { useAuth0 } from '@auth0/auth0-react';
import { connect } from 'react-redux';
import { getProfile } from '../../../state/actions/userProfile/getProfile';
import Applications from '../Applications/Applications';
import MyMentees from '../../pages/MyMentees/MyMentees';
import MyMentors from '../../pages/MyMentors/MyMentors';
import LandingPage from '../LandingPage/LandingPage';

const Dashboard = props => {
  const { user } = useAuth0();
  if (user.email.includes('001') || user.email.includes('002')) {
    return <Applications />;
  } else if (user.email.includes('003')) {
    return <MyMentees />;
  } else if (user.email.includes('004')) {
    return <MyMentors />;
  } else {
    return <LandingPage />;
  }
};

const mapStateToProps = state => {
  return { user: state.userReducer };
};

export default connect(mapStateToProps, { getProfile })(Dashboard);
