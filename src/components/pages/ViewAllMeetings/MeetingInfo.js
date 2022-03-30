import React from 'react';

const MeetingInfo = props => {
  const { info } = props;

  return (
    <div>
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
