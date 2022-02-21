import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';

import Sidebar from '../../common/Sidebar/Sidebar';
import PendingApproval from '../PendingApproval/PendingApproval';

import { authenticateUser } from '../../../state/actions';

function HomeContainer({ LoadingComponent, dispatch, userInfo }) {
  const { authState, authService } = useOktaAuth();

  useEffect(() => {
    dispatch(authenticateUser(authService));
  }, [dispatch, authService]);

  return (
    <>
      {authState.isAuthenticated && !userInfo && <LoadingComponent />}
      {authState.isAuthenticated && userInfo && userInfo.role === 5 ? (
        <PendingApproval userInfo={userInfo} authService={authService} />
      ) : (
        <Sidebar userInfo={userInfo} authService={authService} />
      )}
    </>
  );
}

const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
  };
};

export default connect(mapStateToProps)(HomeContainer);
