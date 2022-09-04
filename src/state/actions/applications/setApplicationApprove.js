import { API_URL } from '../../../config';
import axiosWithAuth from '../../../utils/axiosWithAuth';

export const SET_APPROVAL_SUCCESS = 'SET_APPROVAL_SUCCESS';
export const SET_APPROVAL_FAILURE = 'SET_APPROVAL_FAILURE';

export const applicationApprove = async (profile_id, status) => {
  return async dispatch => {
    try {
      const api = await axiosWithAuth().post(
        `${API_URL}application/update-validate_status/${profile_id}`,
        status
      );

      console.log(status);
      dispatch({ type: SET_APPROVAL_SUCCESS, payload: api });
      return api;
    } catch (err) {
      throw new Error(
        err,
        dispatch({
          type: SET_APPROVAL_FAILURE,
          payload: { approveError: err },
        })
      );
    }
  };
};
