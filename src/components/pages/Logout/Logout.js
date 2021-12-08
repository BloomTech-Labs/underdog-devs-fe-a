import React, { useEffect } from 'react';

const Logout = props => {
  useEffect(() => {
    localStorage.removeItem('okta-pkce-storage');
    localStorage.removeItem('okta-cache-storage');
    localStorage.removeItem('okta-token-storage');
    localStorage.removeItem('role_id');
    props.history.push('/login');
  }, [props.history.push]);
  return <div></div>;
};

export default Logout;
