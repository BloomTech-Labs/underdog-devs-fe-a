import { API_URL } from '../../../config';
import axiosWithAuth from '../../../utils/axiosWithAuth';

export const SET_REJECT_SUCCESS = 'SET_REJECT_SUCCESS';
export const SET_REJECT_FAILURE = 'SET_REJECT_FAILURE';

export const applicationReject = (role_id, application_id, profile_id) => {
  return async dispatch => {
    axiosWithAuth()
      .put(
        `${API_URL}application/update-role/${role_id}/${application_id}/${profile_id}`,
        {
          // application_id,
          // profile_id
        }
      )
      .then(response => {
        dispatch({
          type: SET_REJECT_SUCCESS,
          payload: response,
        });
      })
      .catch(err => {
        dispatch({ type: SET_REJECT_FAILURE, payload: { approveError: err } });
      });
  };
};
