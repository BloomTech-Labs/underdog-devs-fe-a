import axiosWithAuth from '../../../utils/axiosWithAuth';
import { API_URL } from '../../../config';

import { setApplicationProfile } from './setApplicationProfile';
import { setFetchError } from '../errors/setFetchError';
import { setFetchStart } from '../lifecycle/setFetchStart';
import { setFetchEnd } from '../lifecycle/setFetchEnd';

export const getApplication = () => {
  return async dispatch => {
    dispatch(setFetchStart());
    try {
      const api = await axiosWithAuth().post(`/application`);
      api.data.forEach(row => {
        row.hasOwnProperty('accepting_new_mentees')
          ? (row.role_name = 'mentor')
          : (row.role_name = 'mentee');
      });
      dispatch(setApplicationProfile(api.data));
      return api;
    } catch (err) {
      dispatch(setFetchError(err));
    } finally {
      dispatch(setFetchEnd());
    }
  };
};
