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
import NavBarLanding from './components/pages/NavBarLanding/NavBarLanding';
import FooterLanding from './components/pages/FooterLanding/FooterLanding';
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
import { Availability } from './components/pages/Availability/Availability';
import { Schedule } from './components/pages/Schedule/Schedule';
import { ManageResources } from './components/pages/ManageResources/ManageResources';
import { MenteesProgress } from './components/pages/MenteesProgress/MenteesProgress';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './state/reducers';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';

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
      <Navbar />
      <NavBarLanding />
      <Switch>
        <Route path="/landing" component={Landing} />
        <Route path="/signup" component={Signup} />
        <Route path="/menteeapplication" component={Mentee} />
        <Route path="/mentorapplication" component={Mentor} />
        <Route path="/login" component={LoginPage} />
        <Route path="/pendingapproval" component={PendingApproval} />
        <Route path="/availability" component={Availability} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/manageresources" component={ManageResources} />
        <Route path="/menteesprogress" component={MenteesProgress} />
        <Route path="/implicit/callback" component={LoginCallback} />
        {/* any of the routes you need secured should be registered as SecureRoutes */}
        <SecureRoute
          path="/"
          exact
          component={() => <HomePage LoadingComponent={LoadingComponent} />}
        />
        <SecureRoute path="/super-admin-form" component={SuperAdminForm} />
        <Route component={NotFoundPage} />
      </Switch>
      <FooterLanding />
    </Security>
  );
}
