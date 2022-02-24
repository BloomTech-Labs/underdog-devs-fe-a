import React from 'react';
import { connect } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';

import Sidebar from '../../common/Sidebar/Sidebar';
import PendingApproval from '../PendingApproval/PendingApproval';

function HomeContainer({ LoadingComponent, isAuthenticated, userProfile }) {
  const { authService } = useOktaAuth();

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
    userProfile: state.user.userProfile,
  };
};

export default connect(mapStateToProps)(HomeContainer);
