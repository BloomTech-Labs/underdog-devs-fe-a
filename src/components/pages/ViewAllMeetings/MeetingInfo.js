import React from 'react';
import './MeetingInfo.css';

const MeetingInfo = props => {
  const { info } = props;

  console.log(props);

  return (
    <div>
      <p>First Name: {info.first_name}</p>
      <p>Last Name: {info.last_name}</p>
      <p>{info.meeting_id}</p>
      <p>{info.created_at}</p>
      <p>{info.updated_at}</p>
      <p>{info.meeting_topic}</p>
      <p>{info.meeting_time}</p>
      <p>{info.host_id}</p>
      <p>{info.attendee_id}</p>
      <p>{info.meeting_notes}</p>
    </div>
  );
};

export default MeetingInfo;
