// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file

import { useOktaAuth } from '@okta/okta-react';

// USER ACTIONS

export const getUserProfile = () => {
  return dispatch => {
    const token = localStorage.getItem('okta-token-storage');
    dispatch(fetchUserProfile(JSON.parse(token).idToken.claims));
  };
};

export const USER_PROFILE = 'USER_PROFILE';
export const fetchUserProfile = profile => {
  return { type: USER_PROFILE, payload: profile };
};

// CALENDAR ACTIONS----------------------
export const MENTOR_EVENT_STUB = 'MENTOR_EVENT_STUB';
export const getEventTemplateStub = event => {
  return { type: MENTOR_EVENT_STUB, payload: event };
};
export const MENTEE_EVENT_STUB = 'MENTEE_EVENT_STUB';
export const getEventTemplateStub2 = event => {
  return { type: MENTEE_EVENT_STUB, payload: event };
};
// ADMIN TICKETS--------------------------

// ASYNC MANAGEMENT --------------------------
export const FETCH_START = 'FETCH_START';
export const fetchStart = () => {
  return { type: FETCH_START };
};
