import React, { useState } from 'react';
import MeetingInfo from './MeetingInfo';

const VAMData = props => {
  const { meetingData } = props;

  return (
    <div>
      {meetingData.map(info => {
        return <MeetingInfo info={info} key={info.meeting_id} />;
      })}
    </div>
  );
};

export default VAMData;
