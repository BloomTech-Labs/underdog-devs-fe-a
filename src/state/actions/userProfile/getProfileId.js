import axiosWithAuth from '../../../utils/axiosWithAuth';
import { API_URL } from '../../../config';
import { setApplicationProfile } from './setApplicationProfile';
import { setFetchError } from '../errors/setFetchError';
import { setFetchStart } from '../lifecycle/setFetchStart';
import { setFetchEnd } from '../lifecycle/setFetchEnd';

export const getProfileId = profile_Id => dispatch => {
  dispatch(setFetchStart());
  axiosWithAuth()
    .get(`${API_URL}application/${profile_Id}`)
    .then(res => {
      if (res.data) {
        dispatch(setApplicationProfile(res.data));
      }
    })
    .catch(error => {
      dispatch(setFetchError(error));
    })
    .finally(() => dispatch(setFetchEnd()));
};
