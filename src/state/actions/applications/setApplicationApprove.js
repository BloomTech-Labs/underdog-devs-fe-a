import { API_URL } from '../../../config';
import axiosWithAuth from '../../../utils/axiosWithAuth';

export const SET_APPROVAL_SUCCESS = 'SET_APPROVAL_SUCCESS';
export const SET_APPROVAL_FAILURE = 'SET_APPROVAL_FAILURE';

export const applicationApprove = (role_id, application_id, profile_id) => {
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
          type: SET_APPROVAL_SUCCESS,
          payload: response,
        });
      })
      .catch(err => {
        dispatch({
          type: SET_APPROVAL_FAILURE,
          payload: { approveError: err },
        });
      });
  };
};
