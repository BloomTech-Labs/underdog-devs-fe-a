import { useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const axios_instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});

const useAxiosWithAuth0 = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      axios_instance.interceptors.request.use(
        async config => ({
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
        }),
        error => Promise.reject(error)
      );
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  return axios_instance;
};

export default useAxiosWithAuth0;
