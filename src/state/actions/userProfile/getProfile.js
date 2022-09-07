import axiosWithAuth from '../../../utils/axiosWithAuth';
import { API_URL } from '../../../config';
import { setUserProfile } from './setUserProfile';
import { setFetchError } from '../errors/setFetchError';
import { setFetchEnd } from '../lifecycle/setFetchEnd';
import { setFetchStart } from '../lifecycle/setFetchStart';

export const getProfile = (profile_id = '') => {
  return async dispatch => {
    try {
      dispatch(setFetchStart());
      const api = await axiosWithAuth().get(`${API_URL}profile/${profile_id}`);
      dispatch(setUserProfile(api.data));
      return api;
    } catch (err) {
      throw new Error(err, dispatch(setFetchError(err)));
    } finally {
      dispatch(setFetchEnd());
    }
  };
};
