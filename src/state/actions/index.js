export { SET_PROFILE_ID } from './auth/setProfileId';
export { SET_IS_AUTHENTICATED } from './auth/setIsAuthenticated';
export { SET_USER_PROFILE } from './userProfile/setUserProfile';
export { SET_APPLICATION_PROFILE } from './userProfile/setApplicationProfile';
export { SET_CURRENTUSER_PROFILE } from './userProfile/setCurrentUser';
export { SET_FETCH_START } from './lifecycle/setFetchStart';
export { SET_FETCH_END } from './lifecycle/setFetchEnd';
export { SET_FETCH_ERROR } from './errors/setFetchError';
export { MENTOR_ADD_SUCCESS } from './mentor';
export { MENTEE_ADD_SUCCESS } from './mentee';
export { SET_ROLE_ID } from './auth/setRoleId';
export { SET_ALL_USERS } from './allUsers/setAllUsers';

// CALENDAR ACTIONS----------------------
export const MENTOR_EVENT_STUB = 'MENTOR_EVENT_STUB';
export const getEventTemplateStub = event => {
  return { type: MENTOR_EVENT_STUB, payload: event };
};
export const MENTEE_EVENT_STUB = 'MENTEE_EVENT_STUB';
export const getEventTemplateStub2 = event => {
  return { type: MENTEE_EVENT_STUB, payload: event };
};
