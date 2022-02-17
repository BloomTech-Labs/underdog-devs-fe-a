import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';

const MentorMenteeMatching = () => {
<<<<<<< HEAD
<<<<<<< HEAD
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const getAssignments = () => {
      axiosWithAuth()
        .get('/assignments')
        .then(res => {
          console.log(res);
          //   setAssignments(res);
=======
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);
=======
  const [assignments, setAssignments] = useState([]);
>>>>>>> 18bb7ae (cleared redundant code, added correct endpoint)

  useEffect(() => {
    const getAssignments = () => {
      axiosWithAuth()
        .get('/assignments')
        .then(res => {
<<<<<<< HEAD
          setMentors(res);
>>>>>>> bc81dae (matching component started)
=======
          console.log(res);
          //   setAssignments(res);
>>>>>>> 18bb7ae (cleared redundant code, added correct endpoint)
        })
        .catch(err => {
          console.log(err);
        });
    };
<<<<<<< HEAD
<<<<<<< HEAD
    getAssignments();
=======
    getMentors();
  }, []);

  useEffect(() => {
    const getMentees = () => {
      axiosWithAuth()
        //put correct endpoint
        .get('/')
        .then(res => {
          setMentees(res);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getMentees();
>>>>>>> bc81dae (matching component started)
=======
    getAssignments();
>>>>>>> 18bb7ae (cleared redundant code, added correct endpoint)
  }, []);

  return (
    <>
      <h2>Matching</h2>
<<<<<<< HEAD
<<<<<<< HEAD
      <p>list here</p>
=======
>>>>>>> bc81dae (matching component started)
=======
      <p>list here</p>
>>>>>>> 18bb7ae (cleared redundant code, added correct endpoint)
    </>
  );
};

export default MentorMenteeMatching;
