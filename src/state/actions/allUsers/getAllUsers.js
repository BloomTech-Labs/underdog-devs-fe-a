import { setAllUsers } from './setAllUsers';
import axios from 'axios';
import { API_URL } from '../../../config';

export const getAllUsers = role => async dispatch => {
  const res = await axios.post(`${API_URL}users/read/${role}`);
  dispatch(setAllUsers(res.data, role));
  return res.data;
};
