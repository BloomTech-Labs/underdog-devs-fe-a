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
  return async dispatch => {
    dispatch(setFetchStart());
    axios
      .put(`${API_URL}application/update-validate_status/${profileId}`, {
        role: role,
        status: status,
      })
      .then(() => {
        setDisplayModal(false);
        openNotificationWithIcon('success', status);
        if (status === 'approved') {
          return { type: HANDLE_APPLICATION_APPROVE, payload: status };
        } else if (status === 'rejected') {
          return { type: HANDLE_APPLICATION_REJECT, payload: status };
        }
        dispatch(setFetchEnd());
      })
      .catch(err => {
        console.error(err);
        dispatch(setFetchError(err));
        openNotificationWithIcon('error', status, err.message);
        dispatch(setFetchEnd());
      });
  };
};
