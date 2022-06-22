import React from 'react';

import ScheduleEvent from './DialogButton/Dialog';

import CalendarFeature from './Calendar';
// import SwitchablePicker from './DialogButton/ScheduleButton';

// SwitchablePicker is throwing up a lot of errors, and it seems incomplete
// so for the time being, that addition is commented out.
const ScheduleMeeting = () => {
  return (
    <>
      <div className="DialogBox">
        <ScheduleEvent />
      </div>

      <CalendarFeature />
      {/* <div className="DialogBox">
        <SwitchablePicker />
      </div> */}
    </>
  );
};

export default ScheduleMeeting;
