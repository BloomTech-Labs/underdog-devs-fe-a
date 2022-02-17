import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';

const MentorMenteeMatching = () => {
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

  useEffect(() => {
    const getMentors = () => {
      axiosWithAuth()
        //put correct endpoint
        .get('/')
        .then(res => {
          setMentors(res);
>>>>>>> bc81dae (matching component started)
        })
        .catch(err => {
          console.log(err);
        });
    };
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
  }, []);

  return (
    <>
      <h2>Matching</h2>
<<<<<<< HEAD
      <p>list here</p>
=======
>>>>>>> bc81dae (matching component started)
    </>
  );
};

export default MentorMenteeMatching;
