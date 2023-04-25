import * as ACTIONS from '../actions/index';

const initialState = {
  theme: 'dark',
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export default themeReducer;
