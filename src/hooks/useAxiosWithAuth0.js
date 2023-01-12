import { useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

/* 
  THE CURRENT IMPLEMENTATION USING AUDIENCES IS CURRENTLY RETURNING ERRORS AT THE HOME PAGE
*/

const axios_instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});

const useAxiosWithAuth0 = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  // The implementaion of the axios interceptors used below can be found on axios docs on the
  // following link: https://axios-http.com/docs/interceptors

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
