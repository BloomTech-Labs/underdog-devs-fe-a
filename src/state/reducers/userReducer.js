// export const USER_EVENT_START = 'USER_EVENT_START';
import { USER_NAME } from '../actions/index';

const initialState = {
  username: '',
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_NAME:
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};
