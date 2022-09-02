import axiosWithAuth from '../../../utils/axiosWithAuth';

export const NOTES_ADD_SUCCESS = 'NOTES_ADD_SUCCESS';
export const NOTES_ADD_FAILURE = 'NOTES_ADD_FAILURE';

export const addNewNote = (application_id, notesValue) => {
  return async dispatch => {
    axiosWithAuth()
      .put(`/application/update-notes/${application_id}`, notesValue)
      .then(response => {
        dispatch({
          type: NOTES_ADD_SUCCESS,
          payload: response,
        });
      })
      .catch(err => {
        dispatch({ type: NOTES_ADD_FAILURE, payload: { notesError: err } });
      });
  };
};
