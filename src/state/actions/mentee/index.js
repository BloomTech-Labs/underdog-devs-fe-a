import axiosWithAuth from '../../../utils/axiosWithAuth';

export const MENTEE_ADD_SUCCESS = 'MENTEE_ADD_SUCCESS';
export const MENTEE_ADD_FAILURE = 'MENTEE_ADD_FAILURE';

export const postNewMenteeAccount = newAccount => {
  return async dispatch => {
    axiosWithAuth()
      .post(`application/new/mentee`, newAccount)
      .then(() => {
        dispatch({
          type: MENTEE_ADD_SUCCESS,
          payload: { successPage: '/apply/success' },
        });
      })
      .catch(err => {
        dispatch({ type: MENTEE_ADD_FAILURE, payload: { menteeError: err } });
      });
  };
};
