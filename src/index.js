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
import { ExampleListPage } from './components/pages/ExampleList';
import { ProfileListPage } from './components/pages/ProfileList';
import { LoginPage } from './components/pages/Login';
import { HomePage } from './components/pages/Home';
import { LandingPage } from './components/pages/Landing';
import { ExampleDataViz } from './components/pages/ExampleDataViz';
import { config } from './utils/oktaConfig';
import { LoadingComponent } from './components/common';
import Signup from './components/pages/Signup/Signup';
import Navbar from './components/pages/Navbar/Navbar';

import Component1 from './components/features/component1';
import Component2 from './components/features/component2';
import Component3 from './components/features/component3';
import Component4 from './components/features/component4';
import Component5 from './components/features/component5';
import Component6 from './components/features/component6';
import Component7 from './components/features/component7';
import Component8 from './components/features/component8';
import Component9 from './components/features/component9';
import Component10 from './components/features/component10';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
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
      <Switch>
        <Route path="/component1" component={Component1} />
        <Route path="/component2" component={Component2} />
        <Route path="/component3" component={Component3} />
        <Route path="/component4" component={Component4} />
        <Route path="/component5" component={Component5} />
        <Route path="/component6" component={Component6} />
        <Route path="/component7" component={Component7} />
        <Route path="/component8" component={Component8} />
        <Route path="/component9" component={Component9} />
        <Route path="/component10" component={Component10} />

        <Route path="/signup" component={Signup} />
        <Route path="/login" component={LoginPage} />
        <Route path="/implicit/callback" component={LoginCallback} />
        <Route path="/landing" component={LandingPage} />
        {/* any of the routes you need secured should be registered as SecureRoutes */}
        <SecureRoute
          path="/"
          exact
          component={() => <HomePage LoadingComponent={LoadingComponent} />}
        />
        <SecureRoute path="/example-list" component={ExampleListPage} />
        <SecureRoute path="/profile-list" component={ProfileListPage} />
        <SecureRoute path="/datavis" component={ExampleDataViz} />
        <Route component={NotFoundPage} />
      </Switch>
    </Security>
  );
}
