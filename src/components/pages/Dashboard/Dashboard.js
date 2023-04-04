import { useAuth0 } from '@auth0/auth0-react';
import { connect } from 'react-redux';
import { getProfile } from '../../../state/actions/userProfile/getProfile';
import Applications from '../Applications/Applications';
import MenteeMentorDashboard from '../MenteeMentorDashboard/MenteeMentorDashboard';
import LandingPage from '../LandingPage/LandingPage';

const Dashboard = props => {
  const { user } = useAuth0();
  const { currentUser } = props;
  if (currentUser.role === 'admin') {
    return <Applications />;
  } else if (currentUser.role === 'mentor' || currentUser.role === 'mentee') {
    return <MenteeMentorDashboard />;
  } else {
    return <LandingPage />;
  }
};

const mapStateToProps = state => {
  return { currentUser: state.user.currentUser };
};

export default connect(mapStateToProps, { getProfile })(Dashboard);
