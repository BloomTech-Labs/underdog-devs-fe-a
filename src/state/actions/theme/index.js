export const SET_THEME = 'SET_THEME';

export const setThemeRedux = theme => {
  return { type: SET_THEME, payload: theme };
};
