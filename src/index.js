import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
  Redirect,
} from 'react-router-dom';

import 'antd/dist/antd.less';

import { NotFoundPage } from './components/pages/NotFound';
import { Landing } from './components/pages/LandingPage';
import Apply from './components/pages/RoleApply/Apply';
import Mentee from './components/pages/RoleApply/Applications/Mentee';
import Mentor from './components/pages/RoleApply/Applications/Mentor';
import MyMemos from './components/pages/Memos/MyMemos';

import ViewAllMeetings from './components/pages/ViewAllMeetings/ViewAllMeetings';
import Navbar from './components/pages/Navbar/Navbar';
import { ManageResources } from './components/pages/ManageResources/ManageResources';
import { Profile } from './components/pages/Profile';
import Dashboard from './components/pages/Dashboard/Dashboard';
import UserManagement from './components/pages/UserManagement/UserManagement';
import Calendar from './components/common/Calendar';
import MentorMenteeMatching from './components/pages/MentorMenteeMatching/MentorMenteeMatching';
import Reviews from './components/pages/Reviews/MentorReviews';
import Memos from './components/pages/Memos/Memos';
import MemosForm from './components/pages/Memos/MemosForm';
import Attendance from './components/pages/Attendance/attendance';
import MenteeAddReview from './components/pages/AddReviews/MenteeAddReview';
import MentorAddReview from './components/pages/AddReviews/MentorAddReview';
import PendingApplications from './components/pages/PendingApplications/PendingApplication';
import ScheduleMeeting from './components/common/ScheduleMeeting';
import SupportRequests from './components/pages/SupportRequests/SupportRequests';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './state/reducers';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import Auth0ProviderWithHistory from './auth/auth0ProviderWithHistory';
// import { Auth0Provider } from '@auth0/auth0-react';

import PrivateRoute from './components/common/PrivateRoute';

import PendingApproval from './components/pages/PendingApproval/PendingApproval';
import AppSuccess from './components/pages/RoleApply/Applications/AppSuccess';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, promiseMiddleware)
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <Auth0ProviderWithHistory>
          <App />
        </Auth0ProviderWithHistory>
      </Provider>
    </React.StrictMode>
  </Router>
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  // May need to change lines 78-84, 87 in correspondence with Auth0's authorization
  const history = useHistory();

  return (
    <>
      <Navbar />

      <Switch>
        <PrivateRoute path="/" exact component={Dashboard} />
        <Route path="/landing" component={Landing} />
        <Route path="/apply" exact component={Apply} />
        <Route path="/apply/mentee" component={Mentee} />
        <Route path="/apply/mentor" component={Mentor} />
        <Route path="/apply/success" component={AppSuccess} />

        <PrivateRoute
          path="/memos"
          redirect="/dashboard"
          allowRoles={[1, 2, 3, 4]}
          component={Memos}
        />

        <PrivateRoute
          path="/memosform"
          redirect="/dashboard"
          allowRoles={[1, 2, 3, 4]}
          component={MemosForm}
        />

        <PrivateRoute
          path="/mymemos"
          redirect="/dashboard"
          allowRoles={[1, 2, 3, 4]}
          component={MyMemos}
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
          component={SupportRequests}
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
          path="/calendar"
          redirect="/dashboard"
          allowRoles={[1, 2, 3, 4]}
          component={Calendar}
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

        <PrivateRoute
          path="/addMentorReview"
          redirect="/dashboard"
          allowRoles={[1, 2]}
          component={MentorAddReview}
        />

        <PrivateRoute
          path="/addMenteeReview"
          redirect="/dashboard"
          allowRoles={[1, 2]}
          component={MenteeAddReview}
        />

        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
}
