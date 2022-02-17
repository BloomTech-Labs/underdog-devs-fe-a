import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';

const MentorMenteeMatching = () => {
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);

  useEffect(() => {
    const getMentors = () => {
      axiosWithAuth()
        //put correct endpoint
        .get('/')
        .then(res => {
          setMentors(res);
        })
        .catch(err => {
          console.log(err);
        });
    };
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
  }, []);

  return (
    <>
      <h2>Matching</h2>
    </>
  );
};

export default MentorMenteeMatching;
