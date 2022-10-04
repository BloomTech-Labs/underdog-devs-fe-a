import { useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

/*
NOTE:
React requires that we can only call hooks in function components or within other hooks. As axiosWithAuth is simply a helper function we've built a useAxiosWithAuth0() hook in which we've called both axiosWithAuth AND useAuth0().
axiosWithAuth serves the same function as it typically does. useAuth0() gives access to getAccessTokenSilently() for authentication/authorization purposes. 
This hook below is exported and used throughout the app in place of axiosWithAuth.
THIS useAxiosWithAuth0 HOOK SIMPLY SERVES TO HELP CONNECT THE AXIOS CALL AND THE AUTHENTICATION.
*/

export default function useAxiosWithAuth0() {
  const { getAccessTokenSilently } = useAuth0();

  const axiosWithAuth = token => {
    console.log({ token });
    return axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      axiosWithAuth(token);
    })();
  }, [getAccessTokenSilently]);

  return {
    // Exported with the same name to reduce the amount of refactoring needed
    axiosWithAuth,
  };
}
