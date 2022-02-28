import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';

const MentorMenteeMatching = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const getAssignments = () => {
      axiosWithAuth()
        .get('/assignments')
        .then(res => {
          console.log(res.data);
          //   setAssignments(res);
        });
    };
    getAssignments();
  }, []);

  return (
    <>
      <h2>Matching</h2>
      <p>list here</p>
    </>
  );
};

export default MentorMenteeMatching;
