import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Route } from 'react-router-dom';
import { SecureRoute, useOktaAuth } from '@okta/okta-react';
import { authenticateUser } from '../../state/actions/auth/authenticateUser';
import { getProfile } from '../../state/actions/userProfile/getProfile';
import Sidebar from './Sidebar/Sidebar';
import LoadingComponent from './LoadingComponent';

const fakeProfile_id = {
  role_id: 1,
};
const PrivateRoute = ({
  component: Component,
  path,
  redirect,
  allowRoles, // should be an array of allowed role_id's i.e. [3, 4]
  isAuthenticated,
  profile_id,
  userProfile,
  dispatch,
  ...rest
}) => {
  const { push } = useHistory();
  // const { authState, oktaAuth } = useOktaAuth();
  const [loading, setLoading] = useState(true); // hiding contents

  userProfile = fakeProfile_id;

  useEffect(
    () => {
      // if (Object.keys(userProfile).length === 0) {
      // if (profile_id === null) {
      //   if (authState !== null && authState.isAuthenticated) {
      //     dispatch(authenticateUser(authState, oktaAuth));
      //   } else {
      //     push(redirect);
      //   }
      // } else {
      //   dispatch(getProfile(profile_id));
      // }
      // }
      if (allowRoles.includes(userProfile.role_id)) {
        setLoading(false);
      } else {
        push(redirect);
      }
    },
    [
      // isAuthenticated,
      // userProfile,
      // profile_id,
      // allowRoles,
      // redirect,
      // dispatch,
      // oktaAuth,
      // authState,
      // push,
    ]
  );
  console.log(profile_id);

  return loading ? (
    <LoadingComponent />
  ) : (
    <Sidebar>
      {/* <SecureRoute path={path} component={() => Component({ ...rest })} /> */}
      <Route path={path} component={() => Component({ ...rest })} />
    </Sidebar>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.auth.isAuthenticated,
  profile_id: state.user.auth.profile_id,
  userProfile: state.user.userProfile,
});

export default connect(mapStateToProps)(PrivateRoute);
