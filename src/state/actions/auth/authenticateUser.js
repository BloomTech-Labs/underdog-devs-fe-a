import { setFetchStart } from '../lifecycle/setFetchStart';
import { setFetchEnd } from '../lifecycle/setFetchEnd';
import { setFetchError } from '../errors/setFetchError';
import { setProfileId } from './setProfileId';
import { setIsAuthenticated } from './setIsAuthenticated';

export const authenticateUser = (authState, authService) => dispatch => {
  if (authState.isAuthenticated) {
    dispatch(setFetchStart());
    authService
      .getUser()
      .then(parsedJWT => {
        const profile_id = parsedJWT.sub; // sub = profile_id from Okta JWT
        dispatch(setProfileId(profile_id));
        dispatch(setIsAuthenticated(true));
      })
      .catch(error => {
        dispatch(setFetchError(error));
      })
      .finally(() => dispatch(setFetchEnd()));
  }
};
