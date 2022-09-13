export const SET_CURRENTUSER_PROFILE = 'SET_CURRENTUSER_PROFILE';

export const setCurrentUser = profile => {
  return { type: SET_CURRENTUSER_PROFILE, payload: profile };
};
