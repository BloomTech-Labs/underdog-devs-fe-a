import { API_URL } from '../../../config';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { setFetchError } from '../errors/setFetchError';
import { setFetchEnd } from '../lifecycle/setFetchEnd';
import { setFetchStart } from '../lifecycle/setFetchStart';

export const SET_REJECT_SUCCESS = 'SET_REJECT_SUCCESS';

export const applicationReject = (profile_id, status) => {
  return async dispatch => {
    dispatch(setFetchStart());
    try {
      const api = await axiosWithAuth().post(
        `${API_URL}application/update-validate_status/${profile_id}`,
        status
      );
      dispatch({ type: SET_REJECT_SUCCESS, payload: api });
      return api;
    } catch (err) {
      throw new Error(err, dispatch(setFetchError(err)));
    } finally {
      dispatch(setFetchEnd());
    }
  };
};
