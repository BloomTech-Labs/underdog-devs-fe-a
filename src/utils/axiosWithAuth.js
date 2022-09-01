import axios from 'axios';

const axiosWithAuth = () => {
  const token = localStorage.getItem('AuthToken');
  return axios.create({
    baseURL: process.env.REACT_APP_API_URI,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export default axiosWithAuth;
