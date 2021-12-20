import { MENTOR_EVENT_STUB, MENTEE_EVENT_STUB } from '../actions/index';

const initialState = {
  event1: '',
  event2: '',
  event3: '',
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case MENTOR_EVENT_STUB:
      return {
        ...state,
        event: action.payload,
      };
    case MENTEE_EVENT_STUB:
      return {
        ...state,
        event: action.payload,
      };
    default:
      return state;
  }
};

export default calendarReducer;
