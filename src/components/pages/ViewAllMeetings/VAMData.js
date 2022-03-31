import React, { useState } from 'react';
import MeetingInfo from './MeetingInfo';
// import { Calendar } from 'antd';

const VAMData = props => {
  const { meetingData } = props;

  function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
  }

  return (
    <>
      {meetingData.map(info => {
        return <MeetingInfo info={info} key={info.meeting_id} />;
      })}
      {/* (<Calendar onPanelChange={onPanelChange} />, mountNode) */}
    </>
  );
};

export default VAMData;
