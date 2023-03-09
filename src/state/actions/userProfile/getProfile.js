import { setUserProfile } from './setUserProfile';
import axios from 'axios';
import { API_URL } from '../../../config';

export const getProfile = role => async dispatch => {
  const res = await axios.get(`${API_URL}profile/role/${role}`);
  dispatch(setUserProfile(res.data));
  return res.data;
};
