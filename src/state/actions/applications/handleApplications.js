import axios from 'axios';
import { API_URL } from '../../../config';

import { setFetchError } from '../errors/setFetchError';
import { setFetchEnd } from '../lifecycle/setFetchEnd';
import { setFetchStart } from '../lifecycle/setFetchStart';
//?Not sure if I need these imports?

import { openNotificationWithIcon } from './applicationModal';

export const HANDLE_APPLICATION_APPROVE = 'HANDLE_APPLICATION_APPROVE';

export const HANDLE_APPLICATION_REJECT = 'HANDLE_APPLICATION_REJECT';

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
      if (payload.status === 'approved') {
        dispatch({ type: HANDLE_APPLICATION_APPROVE, payload: payload.status });
      } else {
        dispatch({ type: HANDLE_APPLICATION_REJECT, payload: payload.status });
      }
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
