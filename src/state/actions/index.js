export { SET_PROFILE_ID, SET_IS_AUTHENTICATED } from './auth';
export { SET_USER_PROFILE } from './userProfile';
export { SET_FETCH_START, SET_FETCH_END } from './lifecycle';
export { SET_FETCH_ERROR } from './errors';

// CALENDAR ACTIONS----------------------
export const MENTOR_EVENT_STUB = 'MENTOR_EVENT_STUB';
export const getEventTemplateStub = event => {
  return { type: MENTOR_EVENT_STUB, payload: event };
};
export const MENTEE_EVENT_STUB = 'MENTEE_EVENT_STUB';
export const getEventTemplateStub2 = event => {
  return { type: MENTEE_EVENT_STUB, payload: event };
};
