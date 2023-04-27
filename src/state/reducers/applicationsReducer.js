import {
  HANDLE_APPLICATION_APPROVE,
  HANDLE_APPLICATION_REJECT,
} from '../actions/applications/handleApplications';

import { SET_CURRENT_APPLICATION } from '../actions/applications/setCurrentApplication';

const initialState = {
  currentApplication: {
    role: '',
    status: 'pending',
  },
};

const applicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_APPLICATION_APPROVE:
      return {
        ...state,
        status: {
          ...state.status,
          props: {
            color: 'green',
            children: action.payload.status,
          },
        },
      };
    case HANDLE_APPLICATION_REJECT:
      return {
        ...state,
        status: {
          ...state.status,
          props: {
            color: 'red',
            children: action.payload,
          },
        },
      };
    case SET_CURRENT_APPLICATION:
      return {
        ...state,
        currentApplication: action.payload,
      };
    default:
      return state;
  }
};

export default applicationsReducer;
