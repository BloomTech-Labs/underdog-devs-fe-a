export const SET_ALL_USERS = 'SET_USER_PROFILE';

export const setAllUsers = list => {
  console.log(`FROM REDUX`, list);
  return { type: SET_ALL_USERS, payload: list };
};
