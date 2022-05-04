export const SET_USER_PROFILE = 'SET_USER_PROFILE';

export const setUserProfile = profile => {
  return { type: SET_USER_PROFILE, payload: profile };
};
