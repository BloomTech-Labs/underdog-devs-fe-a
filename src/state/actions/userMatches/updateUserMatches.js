import axios from 'axios';
import { API_URL } from '../../../config/index';

export const updateUserMatches =
  (profile, matchArr, role) => async dispatch => {
    role = role.toLowerCase();
    await axios({
      method: 'patch',
      url: `${API_URL}matches/update/${role}/${profile.profile_id}`,
      data: matchArr,
    });
    return;
  };
