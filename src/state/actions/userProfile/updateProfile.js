import { API_URL } from '../../../config';
import axiosWithAuth from '../../../utils/axiosWithAuth';

export const SET_UPDATE_SUCCESS = 'SET_UPDATE_SUCCESS';
export const SET_UPDATE_FAILURE = 'SET_UPDATE_FAILURE';

export const updateProfile = (profile_id, update) => {
  return async dispatch => {
    try {
      const api = await axiosWithAuth().put(
        `${API_URL}profile/${profile_id}`,
        update
      );
      return dispatch({ type: SET_UPDATE_SUCCESS, payload: api });
    } catch (err) {
      throw new Error(
        err,
        dispatch({ type: SET_UPDATE_FAILURE, payload: { updateError: err } })
      );
    }
  };
};
