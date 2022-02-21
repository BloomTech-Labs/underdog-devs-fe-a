import * as ACTIONS from '../actions/index';

const initialState = {
  authState: {},
  authService: {},
  userInfo: '',
  isFetching: false,
  errors: '',
  photo: '',
  profile: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return { ...state, isFetching: true };
    case ACTIONS.FETCH_ERROR:
      return { ...state, errors: action.payload };
    case ACTIONS.FETCH_END:
      return { ...state, isFetching: false };
    case ACTIONS.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
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
