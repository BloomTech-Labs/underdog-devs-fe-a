import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';

import 'antd/dist/antd.less';

import { NotFoundPage } from './components/pages/NotFound';
import { Landing } from './components/pages/LandingPage';
import { LoginPage } from './components/pages/Login';
import { config } from './utils/oktaConfig';
import Signup from './components/pages/RoleSignup/Signup';
import Mentee from './components/pages/RoleSignup/Applications/Mentee';
import Mentor from './components/pages/RoleSignup/Applications/Mentor';
import MyNotes from './components/pages/Notes/MyNotes';

// import AppSuccess from './components/pages/RoleSignup/Applications/AppSuccess';
import ViewAllMeetings from './components/pages/ViewAllMeetings/ViewAllMeetings';
import Navbar from './components/pages/Navbar/Navbar';
import { ManageResources } from './components/pages/ManageResources/ManageResources';
import { Profile } from './components/pages/Profile';
import Dashboard from './components/pages/Dashboard/Dashboard';
import UserManagement from './components/pages/UserManagement/UserManagement';
import MentorMenteeMatching from './components/pages/MentorMenteeMatching/MentorMenteeMatching';
import Reviews from './components/pages/Reviews/MentorReviews';
import Notes from './components/pages/Notes/Notes';
import NotesForm from './components/pages/Notes/NotesForm';
import Attendance from './components/pages/Attendance/attendance';
import MenteeAddReview from './components/pages/AddReviews/MenteeAddReview';
// import MentorAddReview from './components/pages/AddReviews/MentorAddReview';
import PendingApplications from './components/pages/PendingApplications/PendingApplication';
import ScheduleMeeting from './components/common/ScheduleMeeting';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './state/reducers';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';

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
      <Navbar />

      <Switch>
        <Redirect path="/" to="/dashboard" exact component={Dashboard} />
        <Route path="/landing" component={Landing} />
        <Route path="/login" component={LoginPage} />
        <Route path="/apply" exact component={Signup} />
        <Route path="/apply/mentee" component={Mentee} />
        <Route path="/apply/mentor" component={Mentor} />
        {/* <Route path="/apply/success" component={AppSuccess} /> */}
        <Route path="/implicit/callback" component={LoginCallback} />

        <PrivateRoute
          path="/dashboard"
          redirect="/login"
          allowRoles={[1, 2, 3, 4]}
          component={Dashboard}
        />

        <PrivateRoute
          path="/notes"
          redirect="/dashboard"
          allowRoles={[1, 2, 3, 4]}
          component={Notes}
        />

        <PrivateRoute
          path="/notesform"
          redirect="/dashboard"
          allowRoles={[1, 2, 3, 4]}
          component={NotesForm}
        />

        <PrivateRoute
          path="/mynotes"
          redirect="/dashboard"
          allowRoles={[1, 2, 3, 4]}
          component={MyNotes}
        />

        <PrivateRoute
          path="/profile"
          redirect="/login"
          allowRoles={[1, 2, 3, 4]}
          component={Profile}
        />

        <PrivateRoute
          path="/users"
          redirect="/dashboard"
          allowRoles={[1, 2]}
          component={UserManagement}
        />

        <PrivateRoute
          path="/mentees"
          redirect="/dashboard"
          allowRoles={[1, 2, 3]}
          component={() => <div>"My Mentees" Component goes here</div>}
        />

        <PrivateRoute
          path="/resources"
          redirect="/dashboard"
          allowRoles={[1, 2, 3, 4]}
          component={ManageResources}
        />

        {/* <PrivateRoute
          path="/resources"
          redirect="/dashboard"
          allowRoles={[1, 2, 3, 4]}
          component={ManageResources}
        /> */}

        <PrivateRoute
          path="/attendance"
          redirect="/dashboard"
          allowRoles={[1, 2]}
          component={Attendance}
        />

        <PrivateRoute
          path="/support"
          redirect="/dashboard"
          allowRoles={[1, 2, 3, 4]}
          component={() => (
            <div>"View Support Requests" Component goes here</div>
          )}
        />

        <PrivateRoute
          path="/meetings/schedule"
          redirect="/dashboard"
          allowRoles={[1, 2, 3, 4]}
          component={ScheduleMeeting}
        />

        <PrivateRoute
          path="/meetings"
          redirect="/dashboard"
          allowRoles={[1, 2, 3, 4]}
          component={ViewAllMeetings}
        />

        <PrivateRoute
          path="/matching"
          redirect="/dashboard"
          allowRoles={[1]}
          component={MentorMenteeMatching}
        />

        <PrivateRoute
          path="/applications"
          redirect="/dashboard"
          allowRoles={[1, 2]}
          component={PendingApplications}
        />

        <PrivateRoute
          path="/reviews"
          redirect="/dashboard"
          allowRoles={[1]}
          component={Reviews}
        />

        {/* <PrivateRoute
          path="/addMentorReview"
          redirect="/dashboard"
          allowRoles={[1, 2]}
          component={MentorAddReview}
        /> */}

        <PrivateRoute
          path="/addMenteeReview"
          redirect="/dashboard"
          allowRoles={[1, 2]}
          component={MenteeAddReview}
        />

        <Route component={NotFoundPage} />
      </Switch>
    </Security>
  );
}
