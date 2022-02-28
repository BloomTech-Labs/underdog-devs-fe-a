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
  dispatch,
}) {
  const { authState, authService } = useOktaAuth();

  useEffect(() => {
    if (Object.keys(userProfile).length === 0) {
      if (profile_id === null) {
        if (authState.isPending || authState.isAuthenticated) {
          dispatch(authenticateUser(authState, authService));
        }
      } else {
        dispatch(getProfile(profile_id));
      }
    }
  }, [userProfile, profile_id, authState, authService, dispatch]);

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

export default connect(mapStateToProps)(HomeContainer);
