import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';

import 'antd/dist/antd.less';

import { NotFoundPage } from './components/pages/NotFound';
import { Landing } from './components/pages/LandingPage';
import { LoginPage } from './components/pages/Login';
import { HomePage } from './components/pages/Home';
import { SuperAdminForm } from './components/pages/SuperAdminForm';
import { config } from './utils/oktaConfig';
import { LoadingComponent } from './components/common';
import Signup from './components/pages/RoleSignup/Signup';
import Mentee from './components/pages/RoleSignup/Applications/Mentee';
import Mentor from './components/pages/RoleSignup/Applications/Mentor';

import Navbar from './components/pages/Navbar/Navbar';
import PendingApproval from './components/pages/PendingApproval/PendingApproval';
import PendingApplications from './components/pages/PendingApplications/PendingApplication';
import { Availability } from './components/pages/Availability/Availability';
import { Schedule } from './components/pages/Schedule/Schedule';
import { ManageResources } from './components/pages/ManageResources/ManageResources';
import { MenteesProgress } from './components/pages/MenteesProgress/MenteesProgress';
import { Profile } from './components/pages/Profile';
import Dashboard from './components/pages/Dashboard/Dashboard';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './state/reducers';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import NavBarLanding from './components/pages/NavBarLanding/NavBarLanding';

import PrivateRoute from './components/common/PrivateRoute';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, promiseMiddleware)
);

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      {/* <Navbar /> */}
      {/* <NavBarLanding /> */}

      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/login" component={LoginPage} />
        <Route path="/apply" exact component={Signup} />
        <Route path="/apply/mentee" component={Mentee} />
        <Route path="/apply/mentor" component={Mentor} />
        <Route path="/implicit/callback" component={LoginCallback} />

        <PrivateRoute
          path="/dashboard"
          component={() => (
            <div>
              <button onClick={() => history.push('/dashboard')}>
                Dashboard
              </button>
              <button onClick={() => history.push('/allowed')}>Allowed</button>
              <button onClick={() => history.push('/not-allowed')}>
                Not Allowed
              </button>
            </div>
          )}
          loadingComponent={() => <div>Loading...</div>}
          allowRoles={[1, 2, 3, 4]}
          redirect="/"
        />

        <PrivateRoute
          path="/allowed"
          component={() => (
            <div>
              <button onClick={() => history.push('/dashboard')}>
                Dashboard
              </button>
              <button onClick={() => history.push('/allowed')}>Allowed</button>
              <button onClick={() => history.push('/not-allowed')}>
                Not Allowed
              </button>
            </div>
          )}
          loadingComponent={() => <div>Loading...</div>}
          allowRoles={[1, 2, 3, 4, 5]}
          redirect="/"
        />

        <PrivateRoute
          path="/not-allowed"
          component={() => (
            <div>
              <button onClick={() => history.push('/dashboard')}>
                Dashboard
              </button>
              <button onClick={() => history.push('/allowed')}>Allowed</button>
              <button onClick={() => history.push('/not-allowed')}>
                Not Allowed
              </button>

              <div>IMPORTANT INFORMATION</div>
            </div>
          )}
          loadingComponent={() => <div>Loading...</div>}
          allowRoles={[]}
          redirect="/dashboard"
        />

        <SecureRoute
          path="/"
          exact
          component={() => <HomePage LoadingComponent={LoadingComponent} />}
        />
        <SecureRoute path="/super-admin-form" component={SuperAdminForm} />

        <Route component={NotFoundPage} />
      </Switch>
    </Security>
  );
}
