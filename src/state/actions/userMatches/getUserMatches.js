import { setUserMatches } from './setUserMatches';
import axios from 'axios';
import { API_URL } from '../../../config';

export const getUserMatches = (arrOfProfileIDs, role) => async dispatch => {
  role === 'mentor' ? (role = 'mentee') : (role = 'mentor');
  const results = [];
  let n = 0;
  while (n < arrOfProfileIDs.length) {
    const res = await axios({
      method: 'post',
      url: `${API_URL}users/read/${role}`,
      data: {
        profile_id: arrOfProfileIDs[n],
      },
    });
    results.push(res.data);
    n++;
  }
  dispatch(setUserMatches(results));
  return results;
};
