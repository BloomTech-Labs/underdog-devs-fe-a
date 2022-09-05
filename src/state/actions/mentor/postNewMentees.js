import { API_URL } from '../../../config';
import axiosWithAuth from '../../../utils/axiosWithAuth';

export const SET_ACCEPTMENTEE_SUCCESS = 'SET_ACCEPTMENTEE_SUCCESS';

export const acceptMentee = (profileId, mentorStatus) => {
  return async dispatch => {
    try {
      const api = axiosWithAuth().post(
        `${API_URL}profile/availability/${profileId}`,
        mentorStatus
      );
      return dispatch({ type: SET_ACCEPTMENTEE_SUCCESS, payload: api });
    } catch (err) {
      throw new Error(err);
    }
  };
};
