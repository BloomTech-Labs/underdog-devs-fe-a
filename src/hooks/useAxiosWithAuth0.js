import { useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export default function useAxiosWithAuth0() {
  const { getAccessTokenSilently } = useAuth0();

  const axiosWithAuth = token =>
    axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      console.log('token:', token);
      axiosWithAuth(token);
    })();
  }, [getAccessTokenSilently]);

  return {
    axiosWithAuth,
  };
}
