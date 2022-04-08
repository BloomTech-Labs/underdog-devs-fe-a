import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Calendar, Modal, Badge, Button } from 'antd';
import axiosWithAuth from '../../../utils/axiosWithAuth';

const initialValues = [
  {
    meeting_start_date: '01/04/2022',
    type: 'warning',
    content: 'This is warning event.',
    last_name: 'Test information 1',
    meeting_id: 1,
    meeting_topic: 'testing models',
  },
  {
    meeting_start_date: '04/04/2022',
    type: 'success',
    content: 'This is usual event.',
    last_name: 'Test information 2',
    meeting_id: 2,
    meeting_topic: 'product review',
  },
  {
    meeting_start_date: '06/04/2022',
    type: 'error',
    content: 'This is error event 1.',
    last_name: 'Test information 3',
    meeting_id: 3,
    meeting_topic: 'other stuff',
  },
  {
    meeting_start_date: '12/04/2022',
    type: 'error',
    content: 'This is error event 2.',
    last_name: 'Test information 4',
    meeting_id: 4,
    meeting_topic: 'even more other stuff',
  },
  {
    meeting_start_date: '15/04/2022',
    type: 'error',
    content: 'This is error event 3.',
    last_name: 'Test information 5',
    meeting_id: 5,
    meeting_topic: 'Oh, some new other stuff now.',
  },
  {
    meeting_start_date: '18/04/2022',
    type: 'success',
    content: 'This is usual event1.',
    last_name: 'Test information 6',
    meeting_id: 6,
    meeting_topic: 'That was nice',
  },
  {
    meeting_start_date: '27/04/2022',
    type: 'success',
    content: 'This is usual event2.',
    last_name: 'Test information 7',
    meeting_id: 7,
    meeting_topic: 'other stuff. Again',
  },
];

function VAMC(props) {
  const { meetingData } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
  const [event, setEvent] = useState(null);
  const [eventsArr, setEventsArr] = useState(initialValues);

  // useEffect(() => {
  //   axiosWithAuth()
  //     .get('/meetings')
  //     .then(response => {
  //       setEventsArr(response.data);
  //     })
  //     .catch(err => console.error(err));
  // }, []);

  const showModal = value => {
    setEvent(value);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showScheduleModal = () => {
    setIsScheduleModalVisible(true);
  };

  function getListData(value, events) {
    let listData = [];
    let dateValue = value.format('DD/MM/YYYY'); // you can parse value in every format you want

    events.map(e => {
      if (e.meeting_start_date === dateValue) {
        listData.push(e);
      }
    });
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value, eventsArr);
    return (
      <ul className="events">
        {listData.map(item => (
          <span key={item.meeting_id}>
            <Badge
              status={item.type}
              text={item.meeting_topic}
              onClick={() => showModal(item)}
            />
            <br />
          </span>
        ))}
      </ul>
    );
  }

  function getMonthData(value) {
    if (value.month() === 3) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  return (
    <>
      <Calendar
        fullscreen={true}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      />
      <Modal
        title="Event Info"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          {event ? `Event Name: ${event.content}` : 'Something went wrong.'}
        </p>
        <p>
          {event
            ? `Time: ${event.meeting_start_date}`
            : 'Something went wrong.'}
        </p>
        <p>
          {event
            ? `Event Details: ${event.last_name}`
            : 'Something went wrong.'}
        </p>
      </Modal>
    </>
  );
}

export default VAMC;
