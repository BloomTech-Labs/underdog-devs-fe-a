import React from 'react';
import CalendarFeature from './Calendar';
// import SwitchablePicker from './DialogButton/ScheduleButton';

// SwitchablePicker is throwing up a lot of errors, and it seems incomplete
// so for the time being, that addition is commented out.
const ScheduleMeeting = () => {
  return (
    <>
      <CalendarFeature />
      {/* <div className="DialogBox">
        <SwitchablePicker />
      </div> */}
    </>
  );
};

export default ScheduleMeeting;
