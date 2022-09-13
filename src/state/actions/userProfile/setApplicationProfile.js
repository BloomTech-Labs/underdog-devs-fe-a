export const SET_APPLICATION_PROFILE = 'SET_APPLICATION_PROFILE';

export const setApplicationProfile = profile => {
  return { type: SET_APPLICATION_PROFILE, payload: profile };
};
