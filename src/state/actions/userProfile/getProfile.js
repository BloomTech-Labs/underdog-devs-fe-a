import axiosWithAuth from '../../../utils/axiosWithAuth';
import { API_URL } from '../../../config';
import { fetchError } from '../errors';
import { setUserInfo } from './setUserProfile';
import { setFetchStart, setFetchEnd } from '../lifecycle';

export const getProfile = profile_id => dispatch => {
  dispatch(setFetchStart());
  axiosWithAuth()
    .get(`${API_URL}profiles/${profile_id}`)
    .then(res => {
      if (res.data) {
        dispatch(setUserInfo(res.data));
      }
    })
    .catch(error => {
      dispatch(fetchError(error));
    })
    .finally(() => dispatch(setFetchEnd()));
};
