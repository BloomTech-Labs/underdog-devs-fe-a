import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { DatePicker, TimePicker, Select, Space, Row, Col } from 'antd';

const { Option } = Select;

function PickerWithType({ type, onChange }) {
  if (type === 'time') return <TimePicker onChange={onChange} />;
  if (type === 'date') return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
}

function SwitchablePicker() {
  //   const [create, setCreate] = useState(initialValues);
  const handleChange = value => {
    console.log(`selected ${value}`);
  };
  const [type, setType] = useState('time');
  return (
    <Row>
      <Col md={15} xs={24} offset={1}>
        <Space
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexFlow: 'column',
            width: '100%',
            margin: '0rem 1rem 1rem 1.5rem',
          }}
        >
          <Select
            defaultValue="Select Mentor"
            style={{ width: 150 }}
            onChange={handleChange}
          >
            <Option value="Mentor1">Jack</Option>
            <Option value="Mentor2">Lucy</Option>
          </Select>
          <Select
            value={type}
            onChange={setType}
            rules={{
              required: true,
              Message: 'Time is required upon scheduling!',
            }}
          >
            <Option value="time">Time</Option>
            <Option value="date">Date</Option>
          </Select>
          <PickerWithType type={type} onChange={value => console.log(value)} />
        </Space>
      </Col>
    </Row>
  );
}

export default <SwitchablePicker />;
