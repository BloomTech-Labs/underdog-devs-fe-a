import { useAuth0 } from '@auth0/auth0-react';
import { connect } from 'react-redux';
import { getProfile } from '../../../state/actions/userProfile/getProfile';
import Applications from '../Applications/Applications';
import MenteeMentorDashboard from '../MenteeMentorDashboard/MenteeMentorDashboard';
import Mentee from '../RoleApply/Applications/Mentee';
import Mentor from '../RoleApply/Applications/Mentor';
import AppPending from '../RoleApply/Applications/AppPending';
import AppRejected from '../RoleApply/Applications/AppRejected';
import LoadingComponent from '../../common/LoadingComponent';

const Dashboard = ({ currentUser }) => {
  const { user } = useAuth0();

  const { role, tempProfile, validate_status, is_active } = currentUser;

  if (role === 'admin') {
    return <Applications />;
  } else if (validate_status === 'pending') {
    return <AppPending />;
  } else if (validate_status === 'rejected' || is_active === false) {
    return <AppRejected />;
  } else if (!tempProfile && role === 'mentor') {
    return <MenteeMentorDashboard />;
  } else if (!tempProfile && role === 'mentee') {
    return <MenteeMentorDashboard />;
  } else if (tempProfile && role === 'mentor') {
    return <Mentor />;
  } else if (tempProfile && role === 'mentee') {
    return <Mentee />;
  } else {
    return <LoadingComponent />;
  }
};

const mapStateToProps = state => {
  return { currentUser: state.user.currentUser };
};

export default connect(mapStateToProps, { getProfile })(Dashboard);
