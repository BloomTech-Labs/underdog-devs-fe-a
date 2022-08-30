import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';

/**
 * Khaleel Musleh
 * Created Dashboard Compoenent and set it to display the user role, this component is for future use in displaying dashboard based on user role, each dashboard will be set differently
 * based on user role.
 */

const Dashboard = () => {
  const [role, setRole] = useState([]);

  const getAccounts = () => {
    axiosWithAuth()
      .get('/profile/current_user_profile/')
      .then(res => {
        setRole(
          res.data.role_id === 1
            ? 'Super Admin'
            : res.data.role_id === 2
            ? 'Admin'
            : res.data.role_id === 3
            ? 'Mentor'
            : res.data.role_id === 4
            ? 'Mentee'
            : res.data.role_id === 5
            ? 'Developer'
            : 'pending'
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return <div>{`Landing page for ${role}`}</div>;
};

export default Dashboard;
