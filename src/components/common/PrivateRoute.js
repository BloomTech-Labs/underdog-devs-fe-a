import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Route } from 'react-router-dom';
import { authenticateUser } from '../../state/actions/auth/authenticateUser';
import { getProfile } from '../../state/actions/userProfile/getProfile';
import Sidebar from './Sidebar/Sidebar';
import LoadingComponent from './LoadingComponent';

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
  const [loading, setLoading] = useState(true); // hiding contents

  useEffect(() => {
    if (allowRoles.includes(userProfile.role_id)) {
      setLoading(false);
    } else {
      push(redirect);
    }
  }, [
    isAuthenticated,
    userProfile,
    profile_id,
    allowRoles,
    redirect,
    dispatch,
    push,
  ]);
  // remove after build complete. currently logging to assist auth0 implementation.
  console.log(profile_id);

  return loading ? (
    <LoadingComponent />
  ) : (
    <Sidebar>
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
