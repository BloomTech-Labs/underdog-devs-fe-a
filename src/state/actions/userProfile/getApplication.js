import axiosWithAuth from '../../../utils/axiosWithAuth';
import { API_URL } from '../../../config';
import { setApplicationProfile } from './setApplicationProfile';
import { setFetchError } from '../errors/setFetchError';
import { setFetchStart } from '../lifecycle/setFetchStart';
import { setFetchEnd } from '../lifecycle/setFetchEnd';

export const getApplication = () => {
  return async dispatch => {
    // dispatch(setFetchStart());
    try {
      const api = await axiosWithAuth().post(`${API_URL}application/`);
      if (api.data) {
        return dispatch(setApplicationProfile(api.data.users));
      }
      return api;
    } catch (err) {
      throw new Error(err);
    }
  };
};
