import axios from 'axios';
import { API_URL } from '../../../config';

import { setFetchError } from '../errors/setFetchError';
import { setFetchEnd } from '../lifecycle/setFetchEnd';
import { setFetchStart } from '../lifecycle/setFetchStart';

export const MENTOR_ADD_SUCCESS = 'MENTOR_ADD_SUCCESS';
export const MENTOR_ADD_FAILURE = 'MENTOR_ADD_FAILURE';

export const postNewMentorAccount = newAccount => {
  return async dispatch => {
    axios
      .post(`application/new/mentor`, newAccount)
      .then(() => {
        dispatch({
          type: MENTOR_ADD_SUCCESS,
          payload: { successPage: '/apply/success' },
        });
      })
      .catch(err => {
        dispatch({ type: MENTOR_ADD_FAILURE, payload: { mentorError: err } });
      });
    try {
      dispatch(setFetchStart());
      const api = await axios.post(
        `${API_URL}application/new/mentor`,
        newAccount
      );
      dispatch({ type: MENTOR_ADD_SUCCESS, payload: api });
      return api;
    } catch (err) {
      throw new Error(err, dispatch(setFetchError(err)));
    } finally {
      dispatch(setFetchEnd());
    }
  };
};
