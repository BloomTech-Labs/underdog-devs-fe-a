export const SET_CURRENT_APPLICATION = 'SET_CURRENT_APPLICATION';

export const setCurrentApplication = application => {
  return { type: SET_CURRENT_APPLICATION, payload: application };
};
