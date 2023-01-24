import axios from 'axios';
import { API_URL } from '../../../config';

import { setFetchError } from '../errors/setFetchError';
import { setFetchEnd } from '../lifecycle/setFetchEnd';
import { setFetchStart } from '../lifecycle/setFetchStart';

export const GET_ACCOUNTS_SUCCESS = 'GET_ACCOUNT_SUCCESS';

// export  const getAccounts = async (dispatch) => {
//     dispatch(setFetchStart());
//     axios.get(`${API_URL}/profiles`)
//       .then(res => {
//         dispatch({
//             type: GET_ACCOUNTS_SUCCESS,
//             payload: res.data.map(row => ({
//                 key: row.profile_id,
//                 name: row.first_name + ' ' + row.last_name,
//                 role:
//                   row.role_id === 1
//                     ? 'superAdmin'
//                     : row.role_id === 2
//                     ? 'admin'
//                     : row.role_id === 3
//                     ? 'mentor'
//                     : row.role_id === 4
//                     ? 'mentee'
//                     : 'pending',
//                 email: row.email,
//                 notes: 'this is a memo'
//         }))
//       })})
//       .catch(err => {
//         throw new Error(err, dispatch(setFetchError(err)))
//       })
//       .finally(() => dispatch(setFetchEnd()))
//   };

export const getAccounts = async dispatch => {
  dispatch(setFetchStart());
  try {
    const res = await Promise.all([
      axios.get(`${API_URL}profile`),
      axios.get(`${API_URL}mentor/information`),
      axios.get(`${API_URL}mentee/information`),
    ]);
    const data = res.map(res => res.data);
    dispatch({ type: GET_ACCOUNTS_SUCCESS, payload: data });
    console.log(data);
    return data;
  } catch (err) {
    throw new Error(err, dispatch(setFetchError(err)));
  } finally {
    dispatch(setFetchEnd());
  }
};
