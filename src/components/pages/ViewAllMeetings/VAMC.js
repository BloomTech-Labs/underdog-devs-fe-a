import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Calendar, Modal, Badge, Button } from 'antd';

function VAMC(props) {
  const { meetingData } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
  const [event, setEvent] = useState(null);

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
    let dateValue = value.format('MM/DD/YYYY'); // you can parse value in every format you want

    events.map(e => {
      if (e.date === dateValue) {
        listData.push(e);
      }
    });
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value, meetingData);
    return (
      <ul className="events">
        {listData.map((item, i) => (
          <span key={i}>
            <Badge
              status={item.type}
              text={item.first_name}
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
          {event ? `Event Name: ${event.first_name}` : 'Something went wrong.'}
        </p>
        <p>{event ? `Time: ${event.time}` : 'Something went wrong.'}</p>
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
