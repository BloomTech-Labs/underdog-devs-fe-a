import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Calendar, Modal, Badge, Button } from 'antd';

const initialValues = [
  {
    date: '15/03/2022',
    type: 'warning',
    content: 'This is warning event.',
    details: 'Test information 1',
  },
  {
    date: '15/03/2022',
    type: 'success',
    content: 'This is usual event.',
    details: 'Test information 2',
  },
  {
    date: '16/03/2022',
    type: 'error',
    content: 'This is error event 1.',
    details: 'Test information 3',
  },
  {
    date: '16/03/2022',
    type: 'error',
    content: 'This is error event 2.',
    details: 'Test information 4',
  },
  {
    date: '16/03/2022',
    type: 'error',
    content: 'This is error event 3.',
    details: 'Test information 5',
  },
  {
    date: '12/04/2022',
    type: 'success',
    content: 'This is usual event1.',
    details: 'Test information 6',
  },
  {
    date: '12/04/2022',
    type: 'success',
    content: 'This is usual event2.',
    details: 'Test information 7',
  },
];

function VAMC() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
  const [event, setEvent] = useState(null);
  const [eventsArr, setEventsArr] = useState(initialValues);

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
      if (e.date === dateValue) {
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
          <span key={item.content}>
            <Badge
              status={item.type}
              text={item.content}
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
        <p>{event ? `Time: ${event.time}` : 'Something went wrong.'}</p>
        <p>
          {event ? `Event Details: ${event.details}` : 'Something went wrong.'}
        </p>
      </Modal>
    </>
  );
}

export default VAMC;
