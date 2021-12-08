import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useOktaAuth } from '@okta/okta-react';
const Logout = () => {
  const { push } = useHistory();
  const { authService } = useOktaAuth();
  useEffect(() => {
    authService.logout();
    localStorage.removeItem('role_id');
    push('/login');
  }, [push]);
  return <div></div>;
};

export default Logout;
