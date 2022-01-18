import axios from 'axios';
import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';

const PendingApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const getPendingApps = () => {
      axiosWithAuth
        .get('http://localhost:8080/application')
        .then(res => {
          setApplications(res.data);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getPendingApps();
  }, []);

  return (
    <>
      <h2>Pending Applications</h2>

      <table>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Date</th>
        </tr>
        {/*map over pending applications*/}
      </table>
    </>
  );
};

export default PendingApplications;
