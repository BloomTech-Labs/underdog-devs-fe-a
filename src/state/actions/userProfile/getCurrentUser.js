import { API_URL } from '../../../config';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { setFetchStart } from '../lifecycle/setFetchStart';
import { setFetchError } from '../errors/setFetchError';
import { setFetchEnd } from '../lifecycle/setFetchEnd';

import { setCurrentUser } from './setCurrentUser';

export const getCurrentUser = () => {
  return async dispatch => {
    try {
      dispatch(setFetchStart());
      const api = await axiosWithAuth().get(
        `${API_URL}profile/current_user_profile/`
      );
      dispatch(setCurrentUser(api.data));
      return api;
    } catch (err) {
      throw new Error(err, setFetchError(err));
    } finally {
      dispatch(setFetchEnd());
    }
  };
};
