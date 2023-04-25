import axios from 'axios';
import { API_URL } from '../../../config';

import { setFetchError } from '../errors/setFetchError';
import { setFetchEnd } from '../lifecycle/setFetchEnd';
import { setFetchStart } from '../lifecycle/setFetchStart';

import { openNotificationWithIcon } from '../../../components/pages/Applications/ApplicationModal';

export const HANDLE_APPLICATION_SUCCESS = 'HANDLE_APPLICATION_SUCCESS';

export const handleApplication = (setDisplayModal, profileId, role, status) => {
  const payload = {
    role: role,
    status: status,
  };
  return async dispatch => {
    try {
      dispatch(setFetchStart());
      const api = await axios.put(
        `${API_URL}application/update-validate_status/${profileId}`,
        payload
      );
      dispatch(setDisplayModal(false));
      dispatch(openNotificationWithIcon('success', status));
      dispatch({ type: HANDLE_APPLICATION_SUCCESS, payload: payload.status });
      return api;
    } catch (err) {
      throw new Error(
        err,
        dispatch(setFetchError(err)),
        dispatch(openNotificationWithIcon('error', status, err.message))
      );
    } finally {
      dispatch(setFetchEnd());
    }
  };
};
