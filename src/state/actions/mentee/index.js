import axios from 'axios';
import { API_URL } from '../../../config';

import { setFetchError } from '../errors/setFetchError';
import { setFetchEnd } from '../lifecycle/setFetchEnd';
import { setFetchStart } from '../lifecycle/setFetchStart';

export const MENTEE_ADD_SUCCESS = 'MENTEE_ADD_SUCCESS';

export const postNewMenteeAccount = newAccount => {
  return async dispatch => {

    try {
      dispatch(setFetchStart());
      const api = await axios().post(
        `${API_URL}application/new/mentee`,
        newAccount
      );
      dispatch({ type: MENTEE_ADD_SUCCESS, payload: api });
      return api;
    } catch (err) {
      throw new Error(err, dispatch(setFetchError(err)));
    } finally {
      dispatch(setFetchEnd());
    }
  };
};
