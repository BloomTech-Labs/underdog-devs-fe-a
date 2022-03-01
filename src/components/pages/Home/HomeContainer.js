import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';

import Sidebar from '../../common/Sidebar/Sidebar';
import PendingApproval from '../PendingApproval/PendingApproval';
import { authenticateUser, getProfile } from '../../../state/actions/user';

function HomeContainer({
  LoadingComponent,
  isAuthenticated,
  profile_id,
  profile,
  dispatch,
}) {
  const { authState, authService } = useOktaAuth();

  useEffect(() => {
    if (Object.keys(profile).length === 0) {
      if (profile_id === null) {
        if (authState.isPending || authState.isAuthenticated) {
          dispatch(authenticateUser(authState, authService));
        }
      } else {
        dispatch(getProfile(profile_id));
      }
    }
  }, [profile, profile_id, authState, authService, dispatch]);

  return (
    <>
      {isAuthenticated && !profile && <LoadingComponent />}
      {isAuthenticated && profile && profile.role_id === 5 ? (
        <PendingApproval userInfo={profile} authService={authService} />
      ) : (
        <Sidebar userInfo={profile} authService={authService} />
      )}
    </>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.auth.isAuthenticated,
    profile_id: state.user.auth.profile_id,
    profile: state.user.profile,
  };
};

export default connect(mapStateToProps)(HomeContainer);
