import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
const Logout = props => {
  const { push } = useHistory();
  useEffect(() => {
    localStorage.removeItem('okta-pkce-storage');
    localStorage.removeItem('okta-cache-storage');
    localStorage.removeItem('okta-token-storage');
    localStorage.removeItem('role_id');
    push('/login');
  }, [push]);
  return <div></div>;
};

export default Logout;
