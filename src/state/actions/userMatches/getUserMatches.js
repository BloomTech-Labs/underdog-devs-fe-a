import { setUserMatches } from './setUserMatches';
import axios from 'axios';
import { API_URL } from '../../../config';

export const getUserMatches = (arrOfProfileIDs, role) => async dispatch => {
  role === 'mentor' ? (role = 'mentee') : (role = 'mentor');
  const results = [];
  let n = 0;
  if (arrOfProfileIDs.length > 0) {
    while (n < arrOfProfileIDs.length) {
      const res = await axios({
        method: 'post',
        url: `${API_URL}matches/read/${role}`,
        data: {
          profile_id: arrOfProfileIDs[n],
        },
      });
      results.push(res.data[0]);
      n++;
    }
  }
  return dispatch(setUserMatches(results));
};
