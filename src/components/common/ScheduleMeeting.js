import React from 'react';
import CalendarFeature from './Calendar';
import Dialog from './DialogButton/Dialog';

const ScheduleMeeting = () => {
  return (
    <>
      <CalendarFeature />
      <div className="DialogBox">
        <Dialog />
      </div>
    </>
  );
};

export default ScheduleMeeting;
