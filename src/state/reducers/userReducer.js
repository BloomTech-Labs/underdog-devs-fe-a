import * as ACTIONS from '../actions/index';

const initialState = {
  userProfile: {
    /**
     * Author: Khaleel Musleh
     * Fetches a user by profile ID when API is called. /profile/:id
     */
  },
  currentUser: {
    /**
     * Author: Khaleel Musleh
     * Displays current user logged in.
     */
  },
  applicationProfile: {
    /**
     * Author: Khaleel Musleh
     * Gets all the pending applications to localhost:3000/applications.
     */
  },

  lifecycle: {
    // set to true when API call starts, set to false when API call concludes
    isFetching: false,
  },
  success: {
    /**
     * Author: Khaleel Musleh
     * Tracks all Successes dispatched as a result of a success response from the server.
     */
  },
  error: {
    /**
     * Author: Khaleel Musleh
     * Tracks all Errors dispatched as a result of an error response from the server.
     */
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_FETCH_START:
      return { ...state, lifecycle: { ...state.lifecycle, isFetching: true } };
    case ACTIONS.SET_FETCH_ERROR:
      return { ...state, error: [action.payload, state.error] };
    case ACTIONS.SET_FETCH_END:
      return { ...state, lifecycle: { ...state.lifecycle, isFetching: false } };
    case ACTIONS.SET_PROFILE_ID:
      return {
        ...state,
        profile_id: action.payload,
      };
    case ACTIONS.SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload, // do not persist previous state.userProfile
      };
    case ACTIONS.SET_CURRENTUSER_PROFILE:
      return {
        ...state,
        currentUser: action.payload, // do not persist previous state.currentUser
      };
    case ACTIONS.SET_APPLICATION_PROFILE:
      return {
        ...state,
        applicationProfile: action.payload, // do not persist previous state.ApplicationProfile
      };
    case ACTIONS.SET_APPROVAL_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case ACTIONS.SET_REJECT_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case ACTIONS.MENTOR_ADD_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case ACTIONS.MENTEE_ADD_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
