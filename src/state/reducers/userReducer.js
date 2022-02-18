import * as ACTIONS from '../actions/index';

const initialState = {
  authState: {},
  authService: {},
  userInfo: '',
  isFetching: false,
  photo: '',
  profile: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return { ...state, isFetching: true };
    case ACTIONS.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
        isFetching: false,
      };
    case ACTIONS.USER_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
