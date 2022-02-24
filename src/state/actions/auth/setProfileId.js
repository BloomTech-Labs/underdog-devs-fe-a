export const SET_PROFILE_ID = 'SET_PROFILE_ID';

export const setProfileId = profile_id => {
  return { type: SET_PROFILE_ID, payload: profile_id };
};
