import axiosWithAuth from '../../utils/axiosWithAuth';
import { API_URL } from '../../config';

export const SET_PROFILE_ID = 'SET_PROFILE_ID';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const SET_USER_APPLICATION = 'SET_USER_APPLICATION';
export const FETCH_START = 'FETCH_START';
export const FETCH_ERROR = 'FETCH_ERROR';
export const FETCHING_COMPLETE = 'FETCHING_COMPLETE';

export const setProfileId = profile_id => {
  return { type: SET_PROFILE_ID, payload: profile_id };
};
export const setUserProfile = profile => {
  return { type: SET_USER_PROFILE, payload: profile };
};
export const setUserApplication = application => {
  return { type: SET_USER_APPLICATION, payload: application };
};
export const fetchStart = () => {
  return { type: FETCH_START };
};
export const fetchError = error => {
  return { type: FETCH_ERROR, payload: error };
};
export const fetchingComplete = () => {
  return { type: FETCHING_COMPLETE };
};

export const authenticateUser = (authState, authService) => dispatch => {
  if (authState.isAuthenticated) {
    dispatch(fetchStart());
    authService
      .getUser()
      .then(parsedJWT => {
        const profile_id = parsedJWT.sub; // sub = profile_id from Okta JWT
        dispatch(setProfileId(profile_id));
        localStorage.setItem('token', authState.idToken);
      })
      .catch(err => dispatch(fetchError(err)))
      .finally(() => dispatch(fetchingComplete()));
  }
};

export const getProfile = profile_id => dispatch => {
  dispatch(fetchStart());
  axiosWithAuth()
    .get(`${API_URL}profiles/${profile_id}`)
    .then(res => dispatch(setUserProfile(res.data)))
    .catch(err => dispatch(fetchError(err)))
    .finally(() => dispatch(fetchingComplete()));
};

export const getUserApplication = profileId => {
  return dispatch => {
    dispatch(fetchStart());
    axiosWithAuth()
      .get(`/application/profileId/${profileId}`)
      .then(res => dispatch(setUserApplication(res.data)))
      .catch(err => dispatch(fetchError(err)))
      .finally(() => dispatch(fetchingComplete()));
  };
};
