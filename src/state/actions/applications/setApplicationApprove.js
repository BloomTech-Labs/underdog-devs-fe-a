import { API_URL } from '../../../config';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { setFetchError } from '../errors/setFetchError';
import { setFetchEnd } from '../lifecycle/setFetchEnd';
import { setFetchStart } from '../lifecycle/setFetchStart';

export const SET_APPROVAL_SUCCESS = 'SET_APPROVAL_SUCCESS';

export const applicationApprove = async (profile_id, status) => {
  return async dispatch => {
    try {
      dispatch(setFetchStart());
      const api = await axiosWithAuth().post(
        `${API_URL}application/update-validate_status/${profile_id}`,
        status
      );
      dispatch({ type: SET_APPROVAL_SUCCESS, payload: api });
      return api;
    } catch (err) {
      dispatch(err, setFetchError(err));
    } finally {
      dispatch(setFetchEnd());
    }
  };
};
