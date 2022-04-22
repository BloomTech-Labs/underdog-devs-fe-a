import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { DatePicker, TimePicker, Select, Space, Row, Col } from 'antd';
import { Form, Input, Button } from 'antd';

const { Option } = Select;

const SwitchablePicker = () => {
  //   const [create, setCreate] = useState(initialValues);
  const handleChange = value => {
    console.log(`selected ${value}`);
  };
  const [type, setType] = useState('time');

  return (
    <Row>
      <Col md={15} xs={24} offset={3}>
        <Space
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexFlow: 'column',
            width: '100%',
            margin: '0rem 1rem 1rem 1.5rem',
          }}
        >
          <Form.Item>
            <Select
              defaultValue="Select Mentor"
              style={{ width: 150 }}
              onChange={handleChange}
            >
              <Option value="Mentor1">Jack</Option>
              <Option value="Mentor2">Lucy</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: 'Please select a date for this meeting!',
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Time"
            name="time"
            rules={[
              {
                required: true,
                message: 'Please select a time for this meeting!',
              },
            ]}
          >
            <TimePicker use12Hours format="h:mm A" minuteStep={15} />
          </Form.Item>
          <Form.Item label="Details" name="details">
            <Input
              style={{
                height: 150,
                width: 200,
              }}
            />
          </Form.Item>
        </Space>
      </Col>
    </Row>
  );
};

export default () => <SwitchablePicker />;
