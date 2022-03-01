import * as ACTIONS from '../actions/user';

const initialState = {
  auth: {
    isAuthenticated: false,
    profile_id: null,
  },
  profile: {
    // when user hits dashboard, make API call to [GET] /profiles/:id
    // first_name: 'Test',
    // last_name: 'Test',
    // role_id: 3,
    // ...etc.
  },
  data: {},
  isFetching: false,
  errors: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_PROFILE_ID:
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: true,
          profile_id: action.payload,
        },
      };
    case ACTIONS.SET_USER_PROFILE:
      return {
        ...state,
        profile: action.payload, // do not persist previous state.userProfile
      };
    case ACTIONS.FETCH_START:
      return { ...state, isFetching: true };
    case ACTIONS.FETCH_ERROR:
      return { ...state, errors: [...state.errors, action.payload] };
    case ACTIONS.FETCHING_COMPLETE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default userReducer;
