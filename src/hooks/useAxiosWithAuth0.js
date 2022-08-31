import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export default function useAxiosWithAuth0() {
  const token = useAuth0().getAccessTokenSilently();

  const axiosWithAuth = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return {
    axiosWithAuth,
  };
}
