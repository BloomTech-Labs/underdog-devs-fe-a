// export const USER_EVENT_START = 'USER_EVENT_START';
import * as a from '../actions/index';

const initialState = {
  authState: {},
  authService: {},
  userInfo: null,
  isFetching: false,
  photo: '',
  profile: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case a.FETCH_START:
      return { ...state, isFetching: true };
    case a.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
        isFetching: false,
      };
    case a.USER_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
