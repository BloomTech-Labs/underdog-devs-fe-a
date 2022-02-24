import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';

import Sidebar from '../../common/Sidebar/Sidebar';
import PendingApproval from '../PendingApproval/PendingApproval';

import { authenticateUser } from '../../../state/actions/auth/authenticateUser';
import { getProfile } from '../../../state/actions/userProfile/getProfile';

function HomeContainer({
  LoadingComponent,
  isAuthenticated,
  profile_id,
  userProfile,
  authenticateUser,
  getProfile,
}) {
  const { authState, authService } = useOktaAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      authenticateUser(authState, authService);
    }
  }, [authState, authService, isAuthenticated, authenticateUser]);

  useEffect(() => {
    if (profile_id) {
      getProfile(profile_id);
    }
  }, [profile_id, getProfile]);

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
    isAuthenticated: state.user.auth.isAuthenticated,
    profile_id: state.user.auth.profile_id,
    userProfile: state.user.userProfile,
  };
};

export default connect(mapStateToProps, { authenticateUser, getProfile })(
  HomeContainer
);
