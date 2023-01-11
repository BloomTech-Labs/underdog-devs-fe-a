import { useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const axios_instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});

export default function useAxiosWithAuth0() {
  const { getAccessTokenSilently } = useAuth0();
  const { AUTH0_AUDIENCE, REACT_APP_API_URI } = process.env;

  const axiosWithAuth = token => {
    return axios.create({
      baseURL: REACT_APP_API_URI,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently({
        audience: AUTH0_AUDIENCE,
      });
      axiosWithAuth(token);
    })();
  }, []);

  return axios_instance;
};

export default useAxiosWithAuth0;
