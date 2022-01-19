import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';

const PendingApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const getPendingApps = () => {
      axiosWithAuth()
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
        <tbody>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Date</th>
          </tr>

          {applications.map((user, index) => {
            let date = new Date(user.created_at);
            return (
              <tr key={index}>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.role_name}</td>
                <td>{date.toString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default PendingApplications;
