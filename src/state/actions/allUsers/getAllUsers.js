import { setAllUsers } from './setAllUsers';
import axios from 'axios';
import { API_URL } from '../../../config';

export const getAllUsers = () => async dispatch => {
  console.log(`Hello from getALLUSERS`);
  const res = await axios.get(`${API_URL}users/get/all`);
  console.log(`WHAT IS THIS?`, res);
  dispatch(setAllUsers(res.data));
  return res.data;
};
