import axiosWithAuth from '../../../utils/axiosWithAuth';

export const SET_MENTORINFO_SUCCESS = 'SE_MENTORINFO_SUCCESS';

export const mentorInfo = profileId => {
  return async dispatch => {
    try {
      const api = axiosWithAuth().post(`/profile/mentor-information`, {
        profileId,
      });

      return dispatch({ type: SET_MENTORINFO_SUCCESS, payload: api });
    } catch (err) {
      throw new Error(err);
    }
  };
};
