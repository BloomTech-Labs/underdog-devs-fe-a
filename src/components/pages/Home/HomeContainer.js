import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';

import { getRole } from '../../../api/index';
import Sidebar from '../../common/Sidebar/Sidebar';

import { getUserProfile } from '../../../state/actions';

function HomeContainer({ getUserProfile, LoadingComponent }) {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(async info => {
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        const role_id = await getRole(info.sub);
        if (isSubscribed) {
          setUserInfo({ ...info, role: role_id });
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

  getUserProfile(userInfo);

  return (
    <>
      {authState.isAuthenticated && !userInfo && <LoadingComponent />}
      {authState.isAuthenticated && userInfo && (
        <Sidebar userInfo={userInfo} authService={authService} />
      )}
    </>
  );
}

const mapActionsToProps = {
  getUserProfile: getUserProfile,
};

export default connect(null, mapActionsToProps)(HomeContainer);
