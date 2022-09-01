import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

// export const useAxiosWithAuth = (url, options = {}) => {
//   const { getAccessTokenSilently } = useAuth0();
//   const [state, setState] = useState({
//     error: null,
//     loading: true,
//     data: null,
//   });
//   const [refreshIndex, setRefreshIndex] = useState(0);

//   useEffect(() => {
//     (async () => {
//       try {
//         const { audience, scope, ...fetchOptions } = options;
//         const accessToken = await getAccessTokenSilently({ audience, scope });
//         const res = await
//       } catch(err) {

//       }
//     })();
//   }, [refreshIndex])
// }

export default function useAxiosWithAuth0() {
  const { getAccessTokenSilently } = useAuth0();
  // const token = useAuth0().getAccessTokenSilently();

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
  }, []);

  return {
    axiosWithAuth,
  };
}
