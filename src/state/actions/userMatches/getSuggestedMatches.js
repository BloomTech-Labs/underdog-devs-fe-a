import { setSuggestedMatches } from './setSuggestedMatches';
import axios from 'axios';
import { API_URL } from '../../../config';

export const getSuggestedMatches = (profile_id, role) => async dispatch => {
  const results = [];
  let n = 0;
  const arrOfProfIDs = await axios({
    method: 'post',
    url: `${API_URL}matches/${role}/${profile_id}`,
    data: {
      profile_id: `${profile_id}`,
    },
  })
    .then(resp => {
      return resp.data;
    })
    .catch(err => console.error(err));
  if (arrOfProfIDs.length > 0) {
    while (n < arrOfProfIDs.length) {
      const newRole = role === 'mentee' ? 'mentor' : 'mentee';
      const res = await axios({
        method: 'post',
        url: `${API_URL}matches/read/${newRole}`,
        data: {
          profile_id: arrOfProfIDs[n],
        },
      });
      results.push(res.data[0]);
      n++;
    }
  } else {
    dispatch(setSuggestedMatches([]));
  }
  return dispatch(setSuggestedMatches(results));
};
