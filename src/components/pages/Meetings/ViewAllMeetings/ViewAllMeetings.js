import React, { useState, useEffect } from 'react';
import useAxiosWithAuth0 from '../../../../hooks/useAxiosWithAuth0';
import VAMC from './VAMC';

const ViewAllMeetings = () => {
  const [meetingData, setMeetingData] = useState([]);
  const { axiosWithAuth } = useAxiosWithAuth0();

  const getDate = num => {
    let d = '';
    let i = 0;
    let n = new Date(num * 1000).toLocaleString('en-US');

    while (n[i] !== ',') {
      d += n[i];
      i++;
    }
    if (d[1] === '/') d = '0' + d;
    if (d[4] === '/') d = d.substring(0, 3) + '0' + d.substring(3);
    return d;
  };

  const switchProp = arr => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].meeting_start_date = getDate(arr[i].meeting_start_date);
      arr[i].date = arr[i].meeting_start_date;
      delete arr[i].meeting_start_date;
      arr[i].type = 'success';
    }
    return arr;
  };

  useEffect(() => {
    axiosWithAuth()
      .get('/meetings')
      .then(response => {
        setMeetingData(switchProp(response.data));
      })
      .catch(err => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <VAMC meetingData={meetingData} setMeetingData={setMeetingData} />
    </div>
  );
};

export default ViewAllMeetings;
