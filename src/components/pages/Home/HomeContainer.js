import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';

import Sidebar from '../../common/Sidebar/Sidebar';
import PendingApproval from '../PendingApproval/PendingApproval';

import { authenticateUser } from '../../../state/actions/auth';
import { getProfile } from '../../../state/actions/userProfile';

function HomeContainer({
  LoadingComponent,
  isAuthenticated,
  profile_id,
  userProfile,
  authenticateUser,
  getProfile,
}) {
  const { authState, authService } = useOktaAuth();

  return (
    <>
      {isAuthenticated && !userProfile && <LoadingComponent />}
      {isAuthenticated && userProfile && userProfile.role_id === 5 ? (
        <PendingApproval userInfo={userProfile} authService={authService} />
      ) : (
        <Sidebar userInfo={userProfile} authService={authService} />
      )}
    </>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.application.auth.isAuthenticated,
    profile_id: state.application.auth.profile_id,
    userProfile: state.application.userProfile,
  };
};

export default connect(mapStateToProps, { authenticateUser, getProfile })(
  HomeContainer
);
