// ########################### NPM Imports ########################### //
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import 'antd/dist/antd.less';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
// ########################### PAGES AND COMPONENTS ########################### //
import { NotFoundPage } from './components/pages/NotFound';
import { Landing } from './components/pages/LandingPage';
import Apply from './components/pages/RoleApply/Apply';
import Mentee from './components/pages/RoleApply/Applications/Mentee';
import Mentor from './components/pages/RoleApply/Applications/Mentor';
import MyMentors from './components/pages/MyMentors/MyMentors';
import MyMemos from './components/pages/Memos/MyMemos';
import MyMentees from './components/pages/MyMentees/MyMentees';
//import ViewAllMeetings from './components/pages/ViewAllMeetings/ViewAllMeetings';
import AdminMeetingDash from './components/pages/AdminMeetingsDashBoard/AdminMeetingDash';
import MentorMeetingDash from './components/pages/MentorMeetingsDashBoard/MentorMeetingDash';
import MenteeMeetingDash from './components/pages/MenteeMeetingsDashBoard/MenteeMeetingDash';
import Navbar from './components/pages/Navbar/Navbar';
import { ManageResources } from './components/pages/ManageResources/ManageResources';
import { Profile } from './components/pages/Profile';
import Dashboard from './components/pages/Dashboard/Dashboard';
import UserManagement from './components/pages/UserManagement/UserManagement';
import MentorMenteeMatching from './components/pages/MentorMenteeMatching/MentorMenteeMatching';
import Reviews from './components/pages/Reviews/MentorReviews';
import Memos from './components/pages/Memos/Memos';
import MemosForm from './components/pages/Memos/MemosForm';
import Attendance from './components/pages/Attendance/attendance';
import MenteeAddReview from './components/pages/AddReviews/MenteeAddReview';
import MentorAddReview from './components/pages/AddReviews/MentorAddReview';
import PendingApplications from './components/pages/PendingApplications/PendingApplication';
import SupportRequests from './components/pages/SupportRequests/SupportRequests';
import TicketDashboard from './components/pages/TicketsDashboard/TicketsDashboard';
import Analytics from './components/pages/Analytics/Analytics';
import AppSuccess from './components/pages/RoleApply/Applications/AppSuccess';
import ScheduleMeeting from './components/common/ScheduleMeeting';
import Calendar from './components/common/Calendar';
import PrivateRoute from './components/common/PrivateRoute';
// ########################### CONFIG AND SET UP ########################### //
import rootReducer from './state/reducers';
import Auth0ProviderWithHistory from './auth/auth0ProviderWithHistory';

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
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/apply" exact component={Apply} />
        <Route path="/apply/mentee" component={Mentee} />
        <Route path="/apply/mentor" component={Mentor} />
        <Route path="/apply/success" component={AppSuccess} />

        <PrivateRoute
          path="/dashboard"
          allowRoles={[1, 2, 3, 4, 5]}
          component={TicketDashboard}
        />
        <PrivateRoute
          path="/memos"
          allowRoles={[1, 2, 3, 4, 5]}
          component={Memos}
        />
        <PrivateRoute
          path="/memosform"
          allowRoles={[1, 2, 3, 4, 5]}
          component={MemosForm}
        />

        <PrivateRoute
          path="/mymemos"
          allowRoles={[1, 2, 3, 4, 5]}
          component={MyMemos}
        />
        <PrivateRoute
          path="/profile"
          allowRoles={[1, 2, 3, 4, 5]}
          component={Profile}
        />
        <PrivateRoute
          path="/users"
          allowRoles={[1, 2, 5]}
          component={UserManagement}
        />
        <PrivateRoute
          path="/mentees"
          allowRoles={[1, 2, 3, 5]}
          component={MyMentees}
        />

        <PrivateRoute
          path="/mentors"
          allowRoles={[1, 2, 3, 4, 5]}
          component={MyMentors}
        />

        <PrivateRoute
          path="/resources"
          allowRoles={[1, 2, 3, 4, 5]}
          component={ManageResources}
        />
        <PrivateRoute
          path="/attendance"
          allowRoles={[1, 2, 5]}
          component={Attendance}
        />
        <PrivateRoute
          path="/support"
          allowRoles={[1, 2, 3, 4, 5]}
          component={SupportRequests}
        />
        <PrivateRoute
          path="/meetings/schedule"
          allowRoles={[1, 2, 3, 4, 5]}
          component={ScheduleMeeting}
        />
        <PrivateRoute
          path="/admin/meetings"
          allowRoles={[1, 2, 3, 4, 5]}
          component={AdminMeetingDash}
        />
        <PrivateRoute
          path="/mentee/meetings"
          allowRoles={[1, 2, 3, 4, 5]}
          component={MenteeMeetingDash}
        />
        <PrivateRoute
          path="/mentor/meetings"
          allowRoles={[1, 2, 3, 4, 5]}
          component={MentorMeetingDash}
        />
        <PrivateRoute
          path="/calendar"
          allowRoles={[1, 2, 3, 4, 5]}
          component={Calendar}
        />
        <PrivateRoute
          path="/matching"
          allowRoles={[1, 5]}
          component={MentorMenteeMatching}
        />
        <PrivateRoute
          path="/applications"
          allowRoles={[1, 2, 5]}
          component={PendingApplications}
        />
        <PrivateRoute path="/reviews" allowRoles={[1, 5]} component={Reviews} />
        <PrivateRoute
          path="/addMentorReview"
          allowRoles={[1, 2, 5]}
          component={MentorAddReview}
        />
        <PrivateRoute
          path="/addMenteeReview"
          allowRoles={[1, 2, 5]}
          component={MenteeAddReview}
        />
        <PrivateRoute
          path="/analytics"
          allowRoles={[1, 2, 5]}
          component={Analytics}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
}
