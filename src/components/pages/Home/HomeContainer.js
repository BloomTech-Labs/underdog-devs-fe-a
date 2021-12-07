import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import RenderHomePage from './RenderHomePage';
import {getRole} from '../../../api/index';
// import RenderAdminDashboard from '../Dashboard/Admin/RenderAdminDashboard';

function HomeContainer({ LoadingComponent }) {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        // getRole(info.sub);
        if (isSubscribed) {
          setUserInfo({...info, role: getRole(info.sub)});
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

  console.log(userInfo);

  return (
    <>
      {authState.isAuthenticated && !userInfo && (
        <LoadingComponent message="Fetching user dashboard..." />
      )}
      {authState.isAuthenticated && userInfo && (

        // role === 3 ? <RenderAdminDashboard userInfo={userInfo} authService={authService}/> : 
        // role === 2 ? <RenderAdminDashboard userInfo={userInfo} authService={authService}/> : 
        // role === 1 ? <RenderAdminDashboard userInfo={userInfo} authService={authService}/> : 

        <RenderHomePage userInfo={userInfo} authService={authService} />

      )}
    </>
  );
}

export default HomeContainer;
