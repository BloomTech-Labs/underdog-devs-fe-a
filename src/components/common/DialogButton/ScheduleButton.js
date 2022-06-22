import React from 'react';
import {
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Select,
  notification,
} from 'antd';

export default function ScheduleModal(props) {
  const { isModalVisible, setIsModalVisible, eventsArr, setEventsArr } = props;

  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = values => {
    const newEvent = {
      ...values,
      date: values.date.format('DD/MM/YYYY'),
      time: values.time.format('h:mm A'),
      type: 'success',
    };
    console.log('Success:', values);
    setEventsArr([...eventsArr, newEvent]);
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const { Option } = Select;

  const handleChange = value => {
    console.log(`selected ${value}`);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e);
    this.setState({
      isModalVisible: false,
    });
    notification.open({
      message: 'Success!',
      description: 'You have successfully scheduled your meeting!',
    });
  };

  return (
    <>
      <Modal
        title="Schedule a Meeting"
        visible={isModalVisible}
        onCancel={handleCancel}
        getContainer={false}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 'success' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name of your Mentor"
            name="content"
            rules={[
              { required: true, message: 'Please input an event title!' },
            ]}
          >
            <Select
              defaultValue="Select a mentor"
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please pick a time!' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Time"
            name="time"
            rules={[{ required: true, message: 'Please pick a time!' }]}
          >
            <TimePicker use12Hours format="h:mm A" minuteStep={15} />
          </Form.Item>

          <Form.Item
            label="Details"
            name="details"
            rules={[
              { required: true, message: "Please input this event's details!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="cancel">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" onSubmit={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
