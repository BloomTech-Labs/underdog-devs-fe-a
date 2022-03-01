import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SecureRoute, useOktaAuth } from '@okta/okta-react';
import { authenticateUser } from '../../state/actions/user';
import { getProfile } from '../../state/actions/user';
import LoadingComponent from './LoadingComponent';

const PrivateRoute = ({
  component: Component,
  path,
  redirect,
  allowRoles, // should be an array of allowed role_id's i.e. [3, 4]
  isAuthenticated,
  profile_id,
  profile,
  dispatch,
  ...rest
}) => {
  const { push } = useHistory();
  const { authState, authService } = useOktaAuth();
  const [loading, setLoading] = useState(true); // hiding contents

  useEffect(() => {
    if (Object.keys(profile).length === 0) {
      if (profile_id === null) {
        if (authState.isPending || authState.isAuthenticated) {
          dispatch(authenticateUser(authState, authService));
        } else {
          push(redirect);
        }
      } else {
        dispatch(getProfile(profile_id));
      }
    } else if (allowRoles.includes(profile.role_id)) {
      setLoading(false);
    } else {
      push(redirect);
    }
  }, [
    isAuthenticated,
    profile,
    profile_id,
    allowRoles,
    redirect,
    dispatch,
    authService,
    authState,
    push,
  ]);

  return loading ? (
    <LoadingComponent />
  ) : (
    <SecureRoute path={path} component={() => Component({ ...rest })} />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.auth.isAuthenticated,
  profile_id: state.user.auth.profile_id,
  profile: state.user.profile,
});

export default connect(mapStateToProps)(PrivateRoute);
