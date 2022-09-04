import { API_URL } from '../../../config';
import axiosWithAuth from '../../../utils/axiosWithAuth';

export const SET_REJECT_SUCCESS = 'SET_REJECT_SUCCESS';
export const SET_REJECT_FAILURE = 'SET_REJECT_FAILURE';

export const applicationReject = (profile_id, status) => {
  return async dispatch => {
    try {
      const api = await axiosWithAuth().post(
        `${API_URL}application/update-validate_status/${profile_id}`,
        status
      );
      console.log(status);
      dispatch({ type: SET_REJECT_SUCCESS, payload: api });
      return api;
    } catch (err) {
      throw new Error(
        err,
        dispatch({
          type: SET_REJECT_FAILURE,
          payload: { rejectError: err },
        })
      );
    }
  };
};
