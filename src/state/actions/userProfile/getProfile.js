import axiosWithAuth from '../../../utils/axiosWithAuth';
import { API_URL } from '../../../config';
import { setUserProfile } from './setUserProfile';
import { setFetchError } from '../errors/setFetchError';
import { setFetchStart } from '../lifecycle/setFetchStart';
import { setFetchEnd } from '../lifecycle/setFetchEnd';

export const getProfile = profile_id => dispatch => {
  dispatch(setFetchStart());
  axiosWithAuth()
    .get(`${API_URL}profile/${profile_id}`)
    .then(res => {
      if (res.data) {
        dispatch(setUserProfile(res.data));
      }
    })
    .catch(error => {
      dispatch(setFetchError(error));
    })
    .finally(() => dispatch(setFetchEnd()));
};
