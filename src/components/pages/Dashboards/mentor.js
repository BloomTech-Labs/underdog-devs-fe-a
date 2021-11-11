import React from 'react';
import { Button } from 'antd';
import './mentor.css';
import {
  CalendarFilled,
  ProfileTwoTone,
  getTwoToneColor,
  setTwoToneColor,
  CalendarTwoTone,
  PhoneTwoTone,
  BookTwoTone,
} from '@ant-design/icons';

function MentorDash() {
  return (
    <div className="container">
      {/* <Button type="link" href="/">
            Home
            </Button> */}
      <div className="user-buttons">
        <Button icon={<ProfileTwoTone />}>View Profile</Button>
        <Button icon={<CalendarTwoTone twoToneColor="#ffa940" />}>
          Available time slots
        </Button>
        <Button icon={<BookTwoTone twoToneColor="#a0d911" />}>
          Access Resources
        </Button>
        <Button icon={<PhoneTwoTone />}>Contact Support</Button>
      </div>

      <div className="calendar">
        <h1>calendar</h1>
      </div>
    </div>
  );
}

export default MentorDash;
