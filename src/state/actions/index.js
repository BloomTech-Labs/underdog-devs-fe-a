export { SET_PROFILE_ID } from './auth/setProfileId';
export { SET_IS_AUTHENTICATED } from './auth/setIsAuthenticated';
export { SET_USER_PROFILE } from './userProfile/setUserProfile';
export { SET_APPLICATION_PROFILE } from './userProfile/setApplicationProfile';
export {
  SET_APPROVAL_SUCCESS,
  SET_APPROVAL_FAILURE,
} from './applications/setApplicationApprove';
export {
  SET_REJECT_SUCCESS,
  SET_REJECT_FAILURE,
} from './applications/setApplicationReject';
export { SET_FETCH_START } from './lifecycle/setFetchStart';
export { SET_FETCH_END } from './lifecycle/setFetchEnd';
export { SET_FETCH_ERROR } from './errors/setFetchError';
export { MENTOR_ADD_FAILURE, MENTOR_ADD_SUCCESS } from './mentor';

// CALENDAR ACTIONS----------------------
export const MENTOR_EVENT_STUB = 'MENTOR_EVENT_STUB';
export const getEventTemplateStub = event => {
  return { type: MENTOR_EVENT_STUB, payload: event };
};
export const MENTEE_EVENT_STUB = 'MENTEE_EVENT_STUB';
export const getEventTemplateStub2 = event => {
  return { type: MENTEE_EVENT_STUB, payload: event };
};
