import { setAllUsers } from './setAllUsers';
import axios from 'axios';
import { API_URL } from '../../../config';

export const getAllUsers = () => async dispatch => {
  const res = await axios.get(`${API_URL}users/get/all`);
  dispatch(setAllUsers(res.data));
  return res.data;
};
