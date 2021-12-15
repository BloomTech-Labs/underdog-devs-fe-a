// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file

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

// CALENDAR ACTIONS

export const getEventTemplateStub = () => {
  return dispatch => {};
};
export const getEventTemplateStub2 = () => {
  return dispatch => {};
};
// ADMIN TICKETS
