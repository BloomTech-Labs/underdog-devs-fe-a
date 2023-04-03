import axios from 'axios';
import { API_URL } from '../../../config/index';
import { setAllUsers } from '../allUsers/setAllUsers';

export const updateUserMatches =
  (profile, matchArr, role) => async dispatch => {
    role = role.toLowerCase();
    await axios({
      method: 'patch',
      url: `${API_URL}matches/update/${role}/${profile.profile_id}`,
      data: matchArr,
    })
      .then(resp => {
        axios
          .post(`/users/read/${role}/${profile.profile_id}`)
          .then(resp => {
            console.log(`RESP...ECT ---> `, resp);
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  };
