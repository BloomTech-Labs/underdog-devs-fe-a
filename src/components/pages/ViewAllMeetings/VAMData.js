import React, { useState } from 'react';
import MeetingInfo from './MeetingInfo';

const VAMData = props => {
  const { meetingData } = props;

  return (
    <>
      {meetingData.map(info => {
        return <MeetingInfo info={info} key={info.meeting_id} />;
      })}
    </>
  );
};

export default VAMData;
