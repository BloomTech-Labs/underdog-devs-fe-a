// import all of your reducers into this file, and export them back out.
// This allows for the simplification of flow when importing reducers into your actions throughout your app.
import { combineReducers } from 'redux';

import userReducer from './userReducer';
import calendarReducer from './calendarReducer';
import applicationsReducer from './applicationsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  calendarReducer,
  appReducer: applicationsReducer,
});

export default rootReducer;
