import { API_URL } from '../../../config';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { setFetchError } from '../errors/setFetchError';
import { setFetchEnd } from '../lifecycle/setFetchEnd';
import { setFetchStart } from '../lifecycle/setFetchStart';

export const SET_UPDATE_SUCCESS = 'SET_UPDATE_SUCCESS';

export const updateProfile = (profile_id, update) => {
  return async dispatch => {
    try {
      dispatch(setFetchStart());
      const api = await axiosWithAuth().put(
        `${API_URL}profile/${profile_id}`,
        update
      );
      dispatch({ type: SET_UPDATE_SUCCESS, payload: api });
      return api;
    } catch (err) {
      throw new Error(err, dispatch(setFetchError(err)));
    } finally {
      dispatch(setFetchEnd());
    }
  };
};
