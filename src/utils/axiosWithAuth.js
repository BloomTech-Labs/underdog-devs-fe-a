import axios from 'axios';

const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role_id');
  return axios.create({
    baseURL: process.env.REACT_APP_API_URI,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export default axiosWithAuth;
