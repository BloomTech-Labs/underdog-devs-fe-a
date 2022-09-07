import axiosWithAuth from '../../../utils/axiosWithAuth';
import { setFetchError } from '../errors/setFetchError';
import { setFetchEnd } from '../lifecycle/setFetchEnd';
import { setFetchStart } from '../lifecycle/setFetchStart';

export const SET_MENTORINFO_SUCCESS = 'SE_MENTORINFO_SUCCESS';

export const mentorInfo = profileId => {
  return async dispatch => {
    try {
      dispatch(setFetchStart());
      const api = axiosWithAuth().post(`/profile/mentor-information`, {
        profileId,
      });

      dispatch({ type: SET_MENTORINFO_SUCCESS, payload: api });
      return api;
    } catch (err) {
      throw new Error(err, dispatch(setFetchError(err)));
    } finally {
      dispatch(setFetchEnd());
    }
  };
};
