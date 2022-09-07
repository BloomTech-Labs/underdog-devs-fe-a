import { API_URL } from '../../../config';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { setFetchError } from '../errors/setFetchError';
import { setFetchEnd } from '../lifecycle/setFetchEnd';
import { setFetchStart } from '../lifecycle/setFetchStart';

export const SET_ACCEPTMENTEE_SUCCESS = 'SET_ACCEPTMENTEE_SUCCESS';

export const acceptMentee = (profileId, mentorStatus) => {
  return async dispatch => {
    try {
      dispatch(setFetchStart());
      const api = axiosWithAuth().post(
        `${API_URL}profile/availability/${profileId}`,
        mentorStatus
      );
      dispatch({ type: SET_ACCEPTMENTEE_SUCCESS, payload: api });
      return api;
    } catch (err) {
      throw new Error(err, dispatch(setFetchError(err)));
    } finally {
      dispatch(setFetchEnd());
    }
  };
};
