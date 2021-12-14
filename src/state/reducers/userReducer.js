// export const USER_EVENT_START = 'USER_EVENT_START';
import { INITIALIZE_USER, USER_NAME, USER_PROFILE } from '../actions/index';

const initialState = {
  username: '',
  photo: '', //this could be set to that random avatar pic generator
  profile: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_USER:
      return {
        ...state,
      };
    case USER_NAME:
      return {
        ...state,
        username: action.payload,
      };
    case USER_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
