import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Statistic, Row, Col, Table } from 'antd';
import { setCurrentUser } from '../../../state/actions/userProfile/setCurrentUser';
// TODO: update page styling and functionality, see wireframes/NewDesignProposition/AdminWireframes/Dashboard

const Dashboard = props => {
  const { role_id } = props.user.currentUser;

  useEffect(
    dispatch => {
      if (!role_id) {
        dispatch(setCurrentUser());
      }
    },
    [role_id]
  );

  switch (role_id) {
    case 1: // SuperAdmin
      return <AdminDashboard path={'/'} />; //eslint-disable-line
    case 2: // Admin
      return <AdminDashboard path={'/'} />; //eslint-disable-line
    case 3: // Mentors
      return <MentorDashboard path={'/'} />; //eslint-disable-line
    case 4: // Mentees
      return <MenteeDashboard path={'/'} />; //eslint-disable-line
    default:
      return console.log('Role_ID not Found');
  }
};

const mapStateToProps = state => {
  return { user: state.userReducer };
};

// const Dashboard = () => {
//   const [role, setRole] = useState([]);
//   const axiosWithAuth = useAxiosWithAuth0();

//   const getAccounts = () => {
//     axiosWithAuth
//       .get('/profile/current_user_profile/')
//       .then(res => {
//         setRole(
//           res.data.role_id === 1
//             ? 'Super Admin'
//             : res.data.role_id === 2
//             ? 'Admin'
//             : res.data.role_id === 3
//             ? 'Mentor'
//             : res.data.role_id === 4
//             ? 'Mentee'
//             : res.data.role_id === 5
//             ? 'Developer'
//             : 'pending'
//         );
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   };

// useEffect(() => {
//   getAccounts();
// }, []);

// return <div>{`Landing page for ${role}`}</div>;
// };

export default connect(mapStateToProps)(Dashboard);
