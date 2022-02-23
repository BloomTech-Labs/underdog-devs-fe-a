export const SET_FETCH_ERROR = 'SET_FETCH_ERROR';

export const setFetchError = error => {
  return { type: SET_FETCH_ERROR, payload: error };
};
