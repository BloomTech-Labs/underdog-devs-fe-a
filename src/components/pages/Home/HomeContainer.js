import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import { getRole } from '../../../api/index';
import Sidebar from '../../common/Sidebar';

function HomeContainer({ LoadingComponent }) {
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

  return (
    <>
      {authState.isAuthenticated && !userInfo && (
        <LoadingComponent message="Fetching user dashboard..." />
      )}
      {authState.isAuthenticated &&
        userInfo &&
        (userInfo.role === 2 ? (
          // <RenderAdminDashboard userInfo={userInfo} authService={authService} />
          <Sidebar userInfo={userInfo} authService={authService} />
        ) : userInfo.role === 3 ? (
          // <RenderMentorDash userInfo={userInfo} authService={authService} />
          <Sidebar userInfo={userInfo} authService={authService} />
        ) : userInfo.role === 4 ? (
          // <RenderMenteeDash userInfo={userInfo} authService={authService} />
          <Sidebar userInfo={userInfo} authService={authService} />
        ) : (
          // <RenderHomePage userInfo={userInfo} authService={authService} />
          <Sidebar userInfo={userInfo} authService={authService} />
        ))}
    </>
  );
}

export default HomeContainer;
