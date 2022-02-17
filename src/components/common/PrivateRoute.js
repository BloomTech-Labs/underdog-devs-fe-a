import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { SecureRoute, useOktaAuth } from '@okta/okta-react';
import { useHistory } from 'react-router-dom';
import { getRole } from '../../api';

const PrivateRoute = ({
  component: Component,
  path,
  allowRoles,
  redirect,
  profile,
  ...rest
}) => {
  const [pending, setPending] = useState(true);
  const { push } = useHistory();

  useEffect(() => {
    if (!allowRoles.includes(profile.role)) push(redirect);
    else setPending(false);
  }, [allowRoles, redirect, profile.role, push]);

  if (pending) return <></>;

  return <SecureRoute path={path} component={() => Component({ ...rest })} />;
};

// get userProfile from redux
const mapStateToProps = state => ({ profile: state.profile });

export default connect(mapStateToProps, null)(PrivateRoute);
