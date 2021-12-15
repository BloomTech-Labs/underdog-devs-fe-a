// export const USER_EVENT_START = 'USER_EVENT_START';
import { USER_PROFILE } from '../actions/index';

const initialState = {
  photo: '',
  profile: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
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
