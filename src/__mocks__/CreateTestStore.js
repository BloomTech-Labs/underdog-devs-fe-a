import { configureStore, applyMiddleware } from 'redux';
import rootReducer from '../state/reducers/index';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';

export default function createTestStore() {
  const store = configureStore(
    rootReducer,
    applyMiddleware(thunk, promiseMiddleware)
  );
  return store;
}
