export const SET_ROLE_ID = 'SET_ROLE_ID';

export const setRoleId = role_id => {
  return { type: SET_ROLE_ID, payload: role_id };
};
