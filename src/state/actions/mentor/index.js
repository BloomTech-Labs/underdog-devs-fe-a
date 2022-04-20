import axios from 'axios';
import axiosWithAuth from '../../../utils/axiosWithAuth';

export const MENTOR_ADD_SUCCESS = 'MENTOR_ADD_SUCCESS';
export const MENTOR_ADD_FAILURE = 'MENTOR_ADD_FAILURE';

export const postNewMentorAccount = newAccount => {
  return async dispatch => {
    // try {
    //   await axios.post(
    //     `${process.env.REACT_APP_API_URI}application/new/mentor`,
    //     newAccount
    //   );
    //   console.log(newAccount);
    //   dispatch({
    //     type: MENTOR_ADD_SUCCESS,
    //     payload: { successPage: '/apply/success' },
    //   });
    //   // history.push('/apply/success');
    // } catch (err) {
    //   //console.log('ERROR: ', err);
    //   dispatch({ type: MENTOR_ADD_FAILURE, payload: { mentorError: err } });
    // }

    axiosWithAuth()
      .post(`application/new/mentor`, newAccount)
      .then(() => {
        dispatch({
          type: MENTOR_ADD_SUCCESS,
          payload: { successPage: '/apply/success' },
        });
      })
      .catch(err => {
        dispatch({ type: MENTOR_ADD_FAILURE, payload: { mentorError: err } });
      });
  };
};
