import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import VAMData from './VAMData';

const ViewAllMeetings = () => {
  const [meetingData, setMeetingData] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('/meetings')
      .then(response => {
        console.log(response);
        setMeetingData(response.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <VAMData meetingData={meetingData} />{' '}
    </div>
  );
};

export default ViewAllMeetings;
