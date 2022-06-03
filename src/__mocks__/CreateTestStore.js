import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../state/reducers/index';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';

export default function createTestStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk, promiseMiddleware],
  });
  return store;
}
