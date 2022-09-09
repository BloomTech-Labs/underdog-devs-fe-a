import { setUserProfile } from './setUserProfile';

export const getProfile = data => dispatch => {
  dispatch(setUserProfile(data));
};
